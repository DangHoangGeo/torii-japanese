import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarRange,
  ChartNoAxesColumn,
  House,
  Menu,
  MessageSquare,
  PenLine,
  Settings,
  Sunrise,
} from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { ToriiMark } from "@/components/torii-mark";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { to: "/app", label: "Home", icon: House, exact: true },
  { to: "/app/today", label: "Today", icon: Sunrise, exact: false },
  { to: "/app/practice", label: "Practice", icon: BookOpen, exact: false },
  { to: "/app/sensei", label: "Sensei", icon: MessageSquare, exact: false },
  { to: "/app/stats", label: "Stats", icon: ChartNoAxesColumn, exact: false },
] as const;

const SECONDARY = [
  { to: "/app/plan", label: "Year path", icon: CalendarRange },
  { to: "/app/write", label: "Writing", icon: PenLine },
  { to: "/app/settings", label: "Data", icon: Settings },
] as const;

function NavLink({
  to,
  label,
  icon: Icon,
  exact,
  dense,
}: {
  to: string;
  label: string;
  icon: typeof House;
  exact?: boolean;
  dense?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150",
        dense ? "h-11 flex-col justify-center gap-0.5 px-2 text-[11px]" : "h-10",
        active ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-2 hover:text-fg",
      )}
    >
      <Icon className={dense ? "size-4" : "size-4"} strokeWidth={1.75} />
      {label}
    </Link>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="h-8 w-24 animate-pulse rounded-full bg-surface-2" />;
  if (user) return <UserButton />;
  return (
    <Button asChild variant="secondary" size="sm">
      <Link to="/login">Sign in</Link>
    </Button>
  );
}

export function AppShell() {
  const [more, setMore] = useState(false);
  return (
    <div className="seigaiha min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-border bg-surface/90 px-3 py-5 backdrop-blur-sm md:flex">
        <Link to="/app" className="mb-6 flex items-center gap-2 px-2">
          <ToriiMark className="size-8" />
          <span className="font-display text-lg">Torii</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5">
          {PRIMARY.map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
          <div className="my-3 h-px bg-border" />
          {SECONDARY.map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
        </nav>
        <div className="px-1 pt-3">
          <SignedOut>
            <p className="mb-2 px-2 text-xs text-faint">
              Saved on this device. Sign in to write Postgres and Firebase.
            </p>
          </SignedOut>
          <SignedIn>
            <p className="mb-2 px-2 text-xs text-faint">Cloud snapshot writes Postgres and Firebase.</p>
          </SignedIn>
          <AuthSlot />
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:hidden">
        <Link to="/app" className="flex items-center gap-2">
          <ToriiMark className="size-7" />
          <span className="font-display text-base">Torii</span>
        </Link>
        <div className="flex items-center gap-2">
          <AuthSlot />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="More"
            onClick={() => setMore((v) => !v)}
          >
            <Menu />
          </Button>
        </div>
      </header>
      {more ? (
        <div className="border-b border-border bg-surface px-3 py-2 md:hidden">
          {SECONDARY.map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
        </div>
      ) : null}

      <main className="px-4 py-6 pb-28 md:ml-56 md:px-8 md:pb-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        {PRIMARY.map((item) => (
          <NavLink key={item.to} {...item} dense />
        ))}
      </nav>
    </div>
  );
}
