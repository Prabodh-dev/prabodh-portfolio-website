'use client';

import { useEffect } from 'react';

export default function FogBackground() {
  useEffect(() => {
    // Force all wrappers transparent after mount
    const forceTransparent = () => {
      document.querySelectorAll('main, #app, #root, .app, .container, .page-wrapper, .main-content, [class*="wrapper"], [class*="container"], [class*="section"]').forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('background', 'transparent', 'important');
        htmlEl.style.setProperty('background-color', 'transparent', 'important');
        if (htmlEl.tagName === 'MAIN') {
          htmlEl.style.setProperty('position', 'relative', 'important');
          htmlEl.style.setProperty('z-index', '2', 'important');
        }
      });
    };
    
    forceTransparent();
    
    // Watch for React updates adding elements
    const observer = new MutationObserver(() => {
      forceTransparent();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Fog layer with grain texture */}
      <div
        id="ghost-fog"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Vignette layer */}
      <div
        id="ghost-vignette"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </>
  );
}
