import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/tuneticlogo.png" sizes="any" />

        <meta property="og:title" content="Tunetic" />
        <meta property="og:description" content="Music Suggestion App" />
        <meta
          property="og:image"
          content="https://tunetic.vercel.app/tunetic-banner.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://tunetic.vercel.app" />
        <meta property="og:site_name" content="Tunetic" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tunetic" />
        <meta name="twitter:description" content="Music Suggestion App" />
        <meta
          name="twitter:image"
          content="https://tunetic.vercel.app/tunetic-banner.png"
        />
        <meta name="twitter:url" content="https://tunetic.vercel.app" />
        <meta name="twitter:site" content="@kenma_dev" />
        <meta name="twitter:creator" content="@kenma_dev" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
