import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Tunetic",
  description: "Music Suggestion App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/tuneticlogo.png" sizes="any" />
        <meta property="og:title" content="Tunetic" />
        <meta property="og:description" content="Music Suggestion App" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/kenma/image.png?updatedAt=1754597401108"
        />
        <meta property="og:url" content="https://tunetic.vercel.app" />
        <meta property="og:type" content="website" />
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
