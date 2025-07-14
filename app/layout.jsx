import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Tunetic",
  description: "Music Suggestion App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/tuneticlogo.png" sizes="any" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
