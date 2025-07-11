import Header from "../components/Header";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Tunetic",
  description: "Music Suggestion App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <div className="relative">
            <Header />
            <div>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
