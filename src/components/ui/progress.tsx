import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export function Progress({
  className,
  value = 0,
  ...props
}: ProgressPrimitive.ProgressProps) {
  const v = Math.max(0, Math.min(100, value ?? 0));
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-surface-2",
        className,
      )}
      value={v}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${100 - v}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
