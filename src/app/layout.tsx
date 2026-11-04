import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import SiteFooter from "@/components/Footer";
import { Toaster } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Youth Foundation Rohanpur",
  description:
    "Youth Foundation Rohanpur — empowering young people through events, programs and community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense
            fallback={
              <div className="sticky top-0 z-50 h-16 w-full border-b border-glass-border-soft bg-glass" />
            }
          >
            <Nav />
          </Suspense>
          {children}
        </ThemeProvider>
        <SiteFooter></SiteFooter>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
