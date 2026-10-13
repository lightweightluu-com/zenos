import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-ink/90 backdrop-blur-md" />
      <DialogPrimitive.Content
        className={cn('fixed inset-0 z-[70] flex flex-col bg-coal px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]', className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Menü schliessen"
          className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] grid size-12 place-items-center rounded-full text-bone hover:text-gold-soft"
        >
          <X className="size-6" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
