'use client';

import Script from "next/script";
import { useEffect, useState } from "react";

interface SettingsConfig {
  analytics?: {
    gtmId?: string | null;
    ga4Id?: string | null;
  };
  tracking?: {
    metaPixelId?: string | null;
    hotjarSiteId?: string | null;
  };
  consent?: {
    enableConsentBanner?: boolean;
  };
}

/**
 * Analytics Component — GTM + GA4 con Consent Mode v2
 * Lee IDs desde la API /api/settings (administrable en Payload admin)
 * Fallback a env vars si la API no está disponible
 */
export default function Analytics() {
  const [settings, setSettings] = useState<SettingsConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch settings desde la API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => {
        console.warn("[Analytics] Failed to fetch settings, using env vars", err);
        // Fallback a env vars
        setSettings({
          analytics: {
            gtmId: process.env.NEXT_PUBLIC_GTM_ID,
            ga4Id: process.env.NEXT_PUBLIC_GA_ID,
          },
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const gtmId = settings?.analytics?.gtmId;
  const ga4Id = settings?.analytics?.ga4Id;
  const metaPixelId = settings?.tracking?.metaPixelId;
  const hotjarId = settings?.tracking?.hotjarSiteId;

  return (
    <>
      {/* Consent Mode v2 — SIEMPRE ANTES que GTM/GA4 */}
      <Script id="consent-mode-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
        `}
      </Script>

      {/* Google Tag Manager (prioritario) */}
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {/* GA4 (fallback si no hay GTM) */}
      {ga4Id && !gtmId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${metaPixelId}');fbq('track', 'PageView');`}
        </Script>
      )}

      {/* Hotjar */}
      {hotjarId && (
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarId},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}
    </>
  );
}
