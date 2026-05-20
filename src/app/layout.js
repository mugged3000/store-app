import LayoutWrapper from "@/components/Wrapper";
import { Syne, Playfair_Display } from "next/font/google";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Nexora Store",
  description: "Unisex fashion store",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${playfair.variable}`}
    >
      <body className="bg-[#0a0a0a]">

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}