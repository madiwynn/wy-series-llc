import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../_core/trpc';
import Stripe from 'stripe';
import { STRIPE_PRODUCT_IDS } from '../products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const paymentRouter = router({
  /**
   * Create a checkout session for Universal eSIM Sovereignty subscription
   * Returns the Stripe checkout URL
   */
  createCheckoutSession: protectedProcedure
    .input(z.object({
      priceId: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const priceId = input.priceId || STRIPE_PRODUCT_IDS.UNIVERSAL_eSIM_MONTHLY_PRICE;
        
        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          payment_method_types: ['card'],
          line_items: [
            {
              price: priceId,
              quantity: 1
            }
          ],
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || 'unknown',
            customer_name: ctx.user.name || 'User'
          },
          success_url: `${ctx.req.headers.origin || 'https://universal-esim-sovereignty.manus.space'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin || 'https://universal-esim-sovereignty.manus.space'}/payment-cancelled`,
          allow_promotion_codes: true,
          subscription_data: {
            metadata: {
              user_id: ctx.user.id.toString(),
              service: 'universal-esim-sovereignty'
            }
          }
        });

        return {
          success: true,
          sessionId: session.id,
          url: session.url
        };
      } catch (error) {
        console.error('[Payment] Checkout session creation failed:', error);
        throw new Error('Failed to create checkout session');
      }
    }),

  /**
   * Retrieve checkout session details
   */
  getCheckoutSession: publicProcedure
    .input(z.object({
      sessionId: z.string()
    }))
    .query(async ({ input }) => {
      try {
        const session = await stripe.checkout.sessions.retrieve(input.sessionId);
        
        return {
          success: true,
          status: session.payment_status,
          subscriptionId: session.subscription,
          customerId: session.customer,
          metadata: session.metadata
        };
      } catch (error) {
        console.error('[Payment] Failed to retrieve session:', error);
        throw new Error('Failed to retrieve checkout session');
      }
    }),

  /**
   * Get user's subscription status
   */
  getSubscriptionStatus: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        // Query Stripe for subscriptions associated with this user's email
        const subscriptions = await stripe.subscriptions.list({
          customer: ctx.user.email || undefined,
          limit: 1,
          status: 'all'
        });

        if (subscriptions.data.length === 0) {
          return {
            hasSubscription: false,
            status: null,
            subscription: null
          };
        }

        const subscription = subscriptions.data[0];
        return {
          hasSubscription: true,
          status: subscription.status,
          subscription: {
            id: subscription.id,
            status: subscription.status,
            currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            items: subscription.items.data.map((item: any) => ({
              priceId: item.price.id,
              quantity: item.quantity
            }))
          }
        };
      } catch (error) {
        console.error('[Payment] Failed to get subscription status:', error);
        throw new Error('Failed to retrieve subscription status');
      }
    }),

  /**
   * Cancel user's subscription
   */
  cancelSubscription: protectedProcedure
    .mutation(async ({ ctx }) => {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: ctx.user.email || undefined,
          status: 'active',
          limit: 1
        });

        if (subscriptions.data.length === 0) {
          throw new Error('No active subscription found');
        }

        const subscription = await stripe.subscriptions.cancel(subscriptions.data[0].id);

        return {
          success: true,
          message: 'Subscription cancelled successfully',
          subscription: {
            id: subscription.id,
            status: subscription.status,
            canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null
          }
        };
      } catch (error) {
        console.error('[Payment] Failed to cancel subscription:', error);
        throw new Error('Failed to cancel subscription');
      }
    })
});
