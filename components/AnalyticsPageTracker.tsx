"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export default function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const url =
      pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}