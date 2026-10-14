import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

// Vollflächiges Menü: reveal als wachsender Kreis aus der Ecke des Menü-Buttons (siehe .menu in index.css).
// Radix liefert Fokus-Trap, Esc und Scroll-Lock; die Animation hängt an data-state.
export function MenuContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Content
        className={cn('menu fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-coal px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)]', className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Menü schliessen"
          className="absolute right-5 top-[calc(env(safe-area-inset-top)+0.5rem)] grid size-12 place-items-center rounded-full text-bone transition-colors duration-150 hover:text-gold-soft"
        >
          <span className="relative block size-6" aria-hidden="true">
            <span className="bar-a absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
            <span className="bar-b absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
          </span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
