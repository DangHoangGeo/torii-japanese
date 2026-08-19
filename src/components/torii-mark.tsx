import { cn } from "@/lib/utils";

export function ToriiMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M4 10.2c13.2-2.8 26.8-2.8 40 0l-.9 3.4C30.8 10.9 17.2 10.9 4.9 13.6z" />
        <rect x="7.2" y="14.4" width="33.6" height="2.6" />
        <rect x="10.4" y="17" width="4.2" height="25.4" rx="0.6" />
        <rect x="33.4" y="17" width="4.2" height="25.4" rx="0.6" />
        <rect x="10.4" y="28.2" width="27.2" height="2.8" />
        <rect x="21.9" y="17.2" width="4.2" height="11" />
      </g>
    </svg>
  );
}
