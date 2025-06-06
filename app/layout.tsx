import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityProvider } from "@/components/accessibility-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import GeminiChat from "@/components/gemini-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KrishiVaani - Agricultural Information Hub",
  description:
    "Complete resource for agricultural information, weather updates, government schemes, and expert advice.",
  generator: "v0.dev",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://maps.ola.com/api/css/v1.0/style.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AccessibilityProvider>
            <AuthProvider>
              {children}
              <Toaster />
              <GeminiChat />
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
