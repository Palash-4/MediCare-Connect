import "./globals.css";
import Providers from "@/providers/ThemeProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}