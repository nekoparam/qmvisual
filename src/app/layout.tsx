
import type { Metadata, Viewport } from "next";
import { META_THEME_COLORS } from "@/config/site"
import { ThemeProvider } from 'next-themes'
import { headers } from 'next/headers' // 添加这个导入

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

// 创建一个新的服务端组件
async function RootLayoutServer({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  console.log('Server-side UA:', userAgent)
  
  return <RootLayout>{children}</RootLayout>
}

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}


const useServerComponent = process.env.NODE_ENV === 'development'
console.log('Using server component:', useServerComponent)

export default useServerComponent ? RootLayoutServer : RootLayout