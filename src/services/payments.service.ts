import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// This should be your test key for development and live key for production
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export type PaymentType = 'deposit' | 'remaining' | 'freight' | 'starter_fee' | 'photography' | 'marketing' | 'sample';

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export const paymentsService = {
  /**
   * Get the Stripe instance
   */
  getStripe: async (): Promise<Stripe | null> => {
    return stripePromise;
  },

  /**
   * Calculate payment amounts for a project
   */
  calculatePaymentAmounts: (project: any) => {
    const manufacturer = project.selected_manufacturer;
    const quantity = manufacturer?.minOrderQuantity || 0;
    const unitPrice = manufacturer?.price || 0;
    const totalOrderValue = quantity * unitPrice;

    return {
      deposit: totalOrderValue * 0.3, // 30% deposit
      remaining: totalOrderValue * 0.7, // 70% remaining
      freight: 500, // Default freight estimate (can be customized)
      starterFee: project.starter_fee || 399,
      total: totalOrderValue
    };
  },

  /**
   * Record a payment in the project
   * In a real implementation, this would also verify the payment with Stripe
   */
  recordPayment: async (
    projectId: string,
    paymentType: PaymentType,
    paymentIntentId: string,
    projectsService: any
  ) => {
    const now = new Date().toISOString();
    const updates: any = {};

    switch (paymentType) {
      case 'deposit':
        updates.deposit_paid = true;
        updates.deposit_paid_at = now;
        updates.stripe_deposit_payment_id = paymentIntentId;
        break;
      case 'remaining':
        updates.remaining_paid = true;
        updates.remaining_paid_at = now;
        updates.stripe_remaining_payment_id = paymentIntentId;
        break;
      case 'freight':
        updates.freight_paid = true;
        updates.freight_paid_at = now;
        updates.stripe_freight_payment_id = paymentIntentId;
        break;
      case 'photography':
        updates.photography_payment_complete = true;
        updates.photography_payment_date = now;
        updates.stripe_photography_payment_id = paymentIntentId;
        break;
      case 'marketing':
        updates.marketing_payment_complete = true;
        updates.marketing_payment_date = now;
        updates.stripe_marketing_payment_id = paymentIntentId;
        break;
      case 'sample':
        updates.sample_payment_complete = true;
        updates.sample_payment_date = now;
        updates.stripe_sample_payment_id = paymentIntentId;
        break;
    }

    return projectsService.update(projectId, updates);
  },

  /**
   * Get payment status for a project
   */
  getPaymentStatus: (project: any) => {
    return {
      depositPaid: project.deposit_paid || false,
      depositPaidAt: project.deposit_paid_at,
      remainingPaid: project.remaining_paid || false,
      remainingPaidAt: project.remaining_paid_at,
      freightPaid: project.freight_paid || false,
      freightPaidAt: project.freight_paid_at
    };
  }
};
