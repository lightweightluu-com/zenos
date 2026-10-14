import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

// Navigation vom Rand: Drawer, der nur seine eigene Fläche abdunkelt (Scrim + Fokus-Trap + Esc von Radix).
export function DrawerContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="scrim fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          'drawer fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,24rem)] flex-col border-l border-bone/10 bg-coal px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Menü schliessen"
          className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] grid size-12 place-items-center rounded-full text-bone transition-colors duration-150 hover:text-gold-soft"
        >
          <X className="size-6" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
