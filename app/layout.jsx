import "./globals.css";
import Header from "../components/Header";
import Providers from "./providers";

export const metadata = {
  title: "Tunetic",
  description: "Music Suggestion App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="relative">
            <Header />
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
