import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prabodh Raj | Portfolio",
  description: "Portfolio of Prabodh Raj. A new version of the site is under construction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#080808', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}
