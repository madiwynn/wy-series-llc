import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface StripeCheckoutButtonProps {
  label?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}

export default function StripeCheckoutButton({
  label = 'Subscribe to Universal eSIM',
  className = '',
  size = 'default'
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createCheckout = trpc.payment.createCheckoutSession.useMutation();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const result = await createCheckout.mutateAsync({});

      if (result.success && result.url) {
        toast.success('Redirecting to checkout...');
        window.open(result.url, '_blank');
      } else {
        toast.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      size={size}
      className={`bg-gradient-to-r from-wynnwillow-primary to-wynnwillow-accent hover:from-wynnwillow-accent hover:to-wynnwillow-primary text-wynnwillow-dark font-bold ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
