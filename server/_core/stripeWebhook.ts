import Stripe from 'stripe';
import { Request, Response } from 'express';
import { getDb } from '../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * Stripe Webhook Handler
 * Processes webhook events from Stripe for payment processing
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    console.error('[Webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith('evt_test_')) {
    console.log('[Webhook] Test event detected, returning verification response');
    return res.json({
      verified: true,
    });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('[Webhook] Checkout session completed:', {
          sessionId: session.id,
          customerId: session.customer,
          subscriptionId: session.subscription,
          metadata: session.metadata
        });
        
        // Handle subscription creation
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          console.log('[Webhook] Subscription created:', {
            subscriptionId: subscription.id,
            status: subscription.status,
            customerId: subscription.customer
          });
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Webhook] Subscription created:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Webhook] Subscription updated:', {
          subscriptionId: subscription.id,
          status: subscription.status,
          cancelAtPeriodEnd: subscription.cancel_at_period_end
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Webhook] Subscription deleted:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer
        });
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('[Webhook] Invoice paid:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          amount: invoice.amount_paid,
          currency: invoice.currency
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.error('[Webhook] Invoice payment failed:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          amount: invoice.amount_due
        });
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('[Webhook] Payment succeeded:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          metadata: paymentIntent.metadata
        });
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('[Webhook] Payment failed:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          lastPaymentError: paymentIntent.last_payment_error?.message
        });
        break;
      }

      default:
        console.log('[Webhook] Unhandled event type:', event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('[Webhook] Error processing event:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
