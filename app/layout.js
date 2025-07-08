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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}