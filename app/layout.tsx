import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prabodh Raj | Full-Stack Developer Portfolio",
  description: "Portfolio of Prabodh Raj - Full-Stack Developer specializing in Next.js, React, Node.js, and modern web technologies. View projects, experience, and achievements.",
  keywords: ["Prabodh Raj", "Full-Stack Developer", "Web Developer", "Next.js", "React", "Node.js", "Portfolio", "Software Engineer"],
  authors: [{ name: "Prabodh Raj" }],
  openGraph: {
    title: "Prabodh Raj | Full-Stack Developer Portfolio",
    description: "Portfolio of Prabodh Raj - Full-Stack Developer specializing in Next.js, React, Node.js, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabodh Raj | Full-Stack Developer Portfolio",
    description: "Portfolio of Prabodh Raj - Full-Stack Developer specializing in Next.js, React, Node.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Force-fix styles - must be last in head */}
        <style id="ghost-force-styles" dangerouslySetInnerHTML={{__html: `
          /* BODY */
          html, body {
            background: #080808 !important;
            background-color: #080808 !important;
            background-image: none !important;
            min-height: 100vh !important;
          }
          
          html {
            overflow-x: hidden !important;
          }

          /* KILL any wrapper solid backgrounds */
          main, .app, #app, #root, .container, 
          .page-wrapper, .main-content, .home-section,
          [class*="wrapper"], [class*="container"],
          [class*="section"], [class*="page"],
          section, .retro-grid {
            background: transparent !important;
            background-color: transparent !important;
          }

          /* NAVBAR blur — target every possible selector */
          nav, header, .navbar, #navbar, 
          [class*="nav"], [class*="header"] {
            background: rgba(8, 8, 8, 0.82) !important;
            backdrop-filter: blur(24px) !important;
            -webkit-backdrop-filter: blur(24px) !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
            box-shadow: 0 4px 30px rgba(0,0,0,0.5) !important;
          }

          /* NAV LINK GLOW */
          nav a, header a, .nav-link, 
          [class*="nav"] a, [class*="nav-item"],
          header button {
            color: rgba(255,255,255,0.5) !important;
            transition: color 0.2s ease, text-shadow 0.2s ease !important;
          }
          nav a:hover, header a:hover, .nav-link:hover,
          [class*="nav"] a:hover, header button:hover {
            color: #ffffff !important;
            text-shadow: 0 0 16px rgba(255,255,255,0.6) !important;
          }

          /* FOG LAYER with GRAIN */
          #ghost-fog, #ghost-fog-injected {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            pointer-events: none !important;
            z-index: 0 !important;
            background:
              /* Film grain noise */
              url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E"),
              /* Fog orbs */
              radial-gradient(ellipse 80% 60% at 5% 10%, 
                rgba(255,255,255,0.035) 0%, transparent 60%),
              radial-gradient(ellipse 70% 70% at 95% 90%, 
                rgba(255,255,255,0.025) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 50% 50%, 
                rgba(255,255,255,0.02) 0%, transparent 70%) !important;
            animation: fogPulse 12s ease-in-out infinite !important;
          }

          /* VIGNETTE */
          #ghost-vignette, #ghost-vignette-injected {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            pointer-events: none !important;
            z-index: 1 !important;
            background: radial-gradient(
              ellipse 120% 120% at 50% 50%,
              transparent 50%,
              rgba(0,0,0,0.35) 80%,
              rgba(0,0,0,0.55) 100%
            ) !important;
          }

          /* CONTENT above fog */
          main, section, .home-section,
          [class*="content"], [class*="section"] {
            position: relative !important;
            z-index: 2 !important;
          }
          
          /* Home section needs explicit higher z-index */
          #home, section#home {
            z-index: 3 !important;
          }

          /* SCANLINES — kill them */
          body::after, body::before,
          [class*="scanline"], #scanlines,
          .scanlines::before, .scanlines::after,
          [class*="overlay"]:not(#ghost-fog):not(#ghost-vignette):not(#ghost-fog-injected):not(#ghost-vignette-injected) {
            opacity: 0.015 !important;
          }

          @keyframes fogPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.45; }
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
