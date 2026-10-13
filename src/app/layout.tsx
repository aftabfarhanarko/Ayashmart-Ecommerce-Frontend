import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { theme } from "@/theme/antd";
import { baiJamjuree } from "@/app/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ayashmart.com"),
  title: {
    default: "AyashMart — Premium Electronics & Smart Gadgets in Bangladesh",
    template: "%s | AyashMart",
  },
  description:
    "A modern, fast and secure e-commerce platform for premium electronics, smart gadgets and accessories in Bangladesh. Developed by Aftab Farhan ARKO.",
  keywords: [
    "AyashMart",
    "electronics",
    "smart gadgets",
    "power bank",
    "audio",
    "wearables",
    "accessories",
    "online shopping Bangladesh",
    "ecommerce",
  ],
  authors: [{ name: "Aftab Farhan ARKO", url: "https://ayashmart.com" }],
  creator: "Aftab Farhan ARKO",
  publisher: "AyashMart",
  applicationName: "AyashMart",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayashmart.com",
    siteName: "AyashMart",
    title: "AyashMart — Premium Electronics & Smart Gadgets in Bangladesh",
    description:
      "Shop premium electronics, smart gadgets, power banks and accessories with fast delivery across Bangladesh at AyashMart.",
    images: [
      {
        url: "/image.png",
        width: 780,
        height: 160,
        alt: "AyashMart Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AyashMart — Premium Electronics & Smart Gadgets",
    description:
      "A modern, fast and secure e-commerce platform for premium electronics, smart gadgets and accessories in Bangladesh.",
    images: ["/image.png"],
    creator: "@ayashmart",
  },
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body
        className={`${baiJamjuree.variable} font-baiJamjuree antialiased`}
      >
        <ConfigProvider theme={theme}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <Toaster />
                <CartProvider>
                  <AntdRegistry>
                    <div className="min-h-screen">{children}</div>
                  </AntdRegistry>
                </CartProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
