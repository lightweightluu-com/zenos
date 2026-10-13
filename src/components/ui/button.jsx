import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-ink hover:bg-gold-soft shadow-[0_0_0_0_rgba(201,160,99,0.5)] hover:shadow-[0_0_32px_2px_rgba(201,160,99,0.35)]',
        outline: 'border border-bone/25 text-bone hover:border-gold hover:text-gold-soft',
        ghost: 'text-bone hover:text-gold-soft'
      },
      size: {
        default: 'h-12 px-7',
        sm: 'h-10 px-5',
        lg: 'h-14 px-9 text-base',
        icon: 'size-12'
      }
    },
    defaultVariants: { variant: 'gold', size: 'default' }
  }
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
