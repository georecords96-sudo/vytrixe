"use client";

import React, { useEffect, useRef } from "react";
import { getCookieConsentValue } from "react-cookie-consent";

interface AdsterraAdsProps {
  zoneId: string;
  format?: string;
  className?: string;
  minHeight?: string;
}

export function AdsterraAds({ zoneId, format, className = "", minHeight = "0px" }: AdsterraAdsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Consent Validation
    if (getCookieConsentValue("vytrixe_cookie_consent") !== "true") return;
    if (!containerRef.current || !zoneId) return;

    // 2. Duplicate Check
    if (containerRef.current.hasChildNodes()) return;

    try {
      // 3. Inject atOptions
      const atOptions = document.createElement("script");
      atOptions.type = "text/javascript";
      atOptions.innerHTML = `
        atOptions = {
          'key' : '${zoneId}',
          'format' : '${format || "728x90"}',
          'params' : {}
        };
      `;
      atOptions.id = `adsterra-options-${zoneId}`;
      
      // 4. Inject Invoke Script
      const invoke = document.createElement("script");
      invoke.type = "text/javascript";
      invoke.src = `//www.highperformanceformat.com/${zoneId}/invoke.js`;
      invoke.id = `adsterra-invoke-${zoneId}`;
      invoke.async = true;

      containerRef.current.appendChild(atOptions);
      containerRef.current.appendChild(invoke);
      
      console.log(`💰 VYTRIXE: Adsterra Banner [${zoneId}] injected.`);
    } catch (err) {
      console.error("Adsterra Banner Error:", err);
    }
  }, [zoneId, format]);

  return (
    <div 
      className={`ad-container flex justify-center items-center overflow-hidden bg-gray-50/10 ${className}`}
      style={{ minHeight }}
    >
      <div ref={containerRef} className="w-full h-full flex justify-center items-center" />
    </div>
  );
}
