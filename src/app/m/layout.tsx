'use client'

import { useEffect, useState } from "react"
import { Clock, Settings, Grid, RefreshCw, Undo2 } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import { Badge } from "@/components/ui/badge"
import { useSettingsStore } from "@/lib/store"


const inter = Inter({ subsets: ['latin'] })

/* Scaling 总有一些问题，先不用 */
function ScalingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isRequestingDesktopSite = () => {
      // 检查是否是移动设备但请求了桌面版
      const ua = navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
      const hasDesktopIdentifier = /Mozilla.*Windows/i.test(ua) || /Macintosh/i.test(ua);
      
      // 额外检查视口宽度是否接近屏幕宽度
      const isViewportWide = Math.abs(window.screen.width - window.innerWidth) < 100;
      
      return !isMobile;
    };


    const updateScale = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // 只在请求桌面版时应用缩放
      if (!isMobile) {
        document.documentElement.style.setProperty('--app-scale', '1');
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const diagonal = Math.sqrt(width * width + height * height);
      const baseScale = diagonal / Math.sqrt(390*390 + 844*844);
      
      const scale = Math.min(baseScale, 1.7);
      document.documentElement.style.setProperty('--app-scale', scale.toString());
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return children;
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { darkMode } = useSettingsStore()

  // 这里我们模拟未复习的单词数量，实际应用中这应该从某个状态管理器或API获取
  const unreviewed = 5

  const navItems = [
    { href: "/m/overview", icon: Grid, label: "概览" },
    { href: "/m/review", icon: Undo2, label: "复习", badge: unreviewed },
    { href: "/m/word", icon: Clock, label: "单词打卡" },
    { href: "/m/progress", icon: RefreshCw, label: "学习记录" },
    { href: "/m/settings", icon: Settings, label: "设置" },
  ]

  const [viewportHeight, setViewportHeight] = useState('100vh')

  useEffect(() => {
    // Function to update viewport height
    const updateViewportHeight = () => {
      // Use dynamic viewport height if supported
      if (CSS.supports('height: 100dvh')) {
        setViewportHeight('100dvh')
        return
      }
      
      // Fallback for browsers that don't support dvh
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setViewportHeight('calc(var(--vh, 1vh) * 100)')
    }

    // Initial update
    updateViewportHeight()

    // Update on resize and orientation change
    window.addEventListener('resize', updateViewportHeight)
    window.addEventListener('orientationchange', updateViewportHeight)

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
    }
  }, [])

  return (
    <div 
      className={`flex flex-col  fixed inset-0 bg-background text-foreground ${darkMode ? 'dark' : ''}`}
      // style={{ minHeight: viewportHeight, display: 'flex', flexDirection: 'column' }}
      style={{ height: viewportHeight }}
    >
      <main className="flex-1 overflow-auto flex w-full">
      {/* <ScalingProvider>{children}</ScalingProvider> */}
      {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="border-t bg-white dark:bg-gray-900 py-2 px-4 sticky bottom-0 left-0 right-0">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center p-2 relative">
              <item.icon className={`h-6 w-6 ${pathname === item.href ? 'text-blue-500' : 'text-gray-500'}`} />
              <span className={`text-xs ${pathname === item.href ? 'text-blue-500' : 'text-gray-500'}`}>{item.label}</span>
              {item.badge && (
                <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}