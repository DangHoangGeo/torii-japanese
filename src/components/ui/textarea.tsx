import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
