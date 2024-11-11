import type { Metadata, Viewport } from "next";
import { META_THEME_COLORS } from "@/config/site"

import localFont from "next/font/local";
import "@/styles/globals.css";

const geistSans = localFont({
  src: "..//assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "..//assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CAOWORD.me 草窝单词",
  description: "为了考试而背单词速刷的单词学习平台",
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
