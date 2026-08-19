import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="seigaiha flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center text-fg">
      <TriangleAlert className="size-10 text-primary" strokeWidth={1.75} aria-hidden="true" />
      <h1 className="font-display text-lg font-medium">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
    </main>
  );
}
