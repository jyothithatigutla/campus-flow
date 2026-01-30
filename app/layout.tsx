import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Crisp technical font
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CampusFlow | Smart Campus Management",
  description: "Next-gen campus management with AI and Geofenced attendance.",
  manifest: "/manifest.json",
};

import { Toaster } from "@/components/ui/sonner";
import { AiAssistant } from "@/components/ai-assistant";
import { GlobalProvider } from "@/context/app-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <GlobalProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light" // Default to light based on user preference
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <AiAssistant />
            <Toaster />
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
