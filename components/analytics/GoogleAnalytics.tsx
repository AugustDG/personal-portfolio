'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Google Analytics integration.
 *
 * Reads the measurement ID from the NEXT_PUBLIC_GA_ID environment variable.
 * If the variable is missing, renders nothing (safe no-op in all environments).
 * Tracks client-side route changes via the app router using usePathname.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();

  // Only run effect when GA is enabled.
  useEffect(() => {
    if (!gaId) return;
    // On route change, send page view.
    (window as any).gtag?.('config', gaId, { page_path: pathname });
  }, [pathname, gaId]);

  if (!gaId) return null;

  return (
    <>
      {/* Global Site Tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} // eslint-disable-line
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
