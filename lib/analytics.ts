// lib/analytics.ts

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

type EventParams = Record<string, string | number | boolean | null | undefined>;

function canTrack(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(GA_ID) &&
    typeof window.gtag === "function"
  );
}

/**
 * Sends a custom GA4 event.
 */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (!canTrack()) return;
  window.gtag!("event", eventName, params);
}

/**
 * Sends a manual page view for App Router navigation.
 * We use `send_page_view: false` on the base config in layout,
 * then call this on route changes.
 */
export function trackPageView(url: string): void {
  if (!canTrack()) return;

  window.gtag!("event", "page_view", {
    page_location: window.location.href,
    page_path: url,
    page_title: document.title,
  });
}