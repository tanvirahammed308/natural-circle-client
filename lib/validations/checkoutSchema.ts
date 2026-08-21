import { z } from 'zod';

export const checkoutSchema = z.object({
  street: z.string().min(3, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  postalCode: z.string().min(3, 'Postal code is required').max(12, 'Postal code is too long'),
  country: z.string().min(2, 'Country is required'),
});
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
