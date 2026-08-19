import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ToriiMark } from "@/components/torii-mark";
import appCss from "../styles.css?url";

const APP_NAME = "Torii";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host ? `https://${host}/og.jpg` : undefined;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Torii — Japanese from first kana to JLPT N2 in one year. SRS, a 365-day path, and a sensei that reads your stats.",
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#9a3324" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: APP_NAME },
      { property: "og:type", content: "website" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+JP:wght@500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-sans text-sm",
            style: {
              background: "var(--color-surface)",
              color: "var(--color-fg)",
              border: "1px solid var(--color-border)",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="seigaiha grid min-h-screen place-items-center px-6 text-center">
      <div>
        <ToriiMark className="mx-auto size-12" />
        <p className="mt-6 font-display text-4xl text-primary">404</p>
        <p className="mt-2 text-muted">This path does not exist.</p>
        <Link to="/" className="mt-6 inline-block text-sm text-primary underline-offset-4 hover:underline">
          Return to the gate
        </Link>
      </div>
    </main>
  );
}
