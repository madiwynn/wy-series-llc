/**
 * Stripe Products and Prices Configuration
 * Define all products and their pricing tiers here for centralized management
 */

export const PRODUCTS = {
  UNIVERSAL_eSIM: {
    name: 'Universal eSIM Sovereignty',
    description: 'Global connectivity platform with carrier-free sovereignty',
    metadata: {
      category: 'connectivity',
      features: 'global,carrier-free,no-contracts'
    }
  }
};

export const PRICES = {
  UNIVERSAL_eSIM_MONTHLY: {
    productName: PRODUCTS.UNIVERSAL_eSIM.name,
    amount: 3900, // $39.00 in cents
    currency: 'usd',
    interval: 'month',
    intervalCount: 1,
    metadata: {
      tier: 'standard',
      description: '$39/month recurring subscription'
    }
  }
};

export const STRIPE_PRODUCT_IDS = {
  UNIVERSAL_eSIM: process.env.STRIPE_PRODUCT_UNIVERSAL_eSIM || 'prod_universal_esim',
  UNIVERSAL_eSIM_MONTHLY_PRICE: process.env.STRIPE_PRICE_UNIVERSAL_eSIM_MONTHLY || 'price_universal_esim_monthly'
};
