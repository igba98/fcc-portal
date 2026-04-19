import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { NextAuthSessionProvider } from "@/components/auth/NextAuthSessionProvider";

const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FCC Trademark Prototype",
  description: "FCC Trademark Recordation & Inspection System Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <NextAuthSessionProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster richColors position="top-center" />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
