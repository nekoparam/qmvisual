'use client'

import { useEffect } from "react"
import { Clock, Settings, Grid, RefreshCw, Undo2 } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import { Badge } from "@/components/ui/badge"
import { useSettingsStore } from "@/lib/store"


const inter = Inter({ subsets: ['latin'] })

function ScalingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const diagonal = Math.sqrt(width * width + height * height)
      const baseScale = diagonal / Math.sqrt(390*390 + 844*844)
      
      // 限制最大缩放比例为1.3
      const scale = Math.min(baseScale, 1.5)
      
      document.documentElement.style.setProperty('--app-scale', scale.toString())
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return children
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

  return (
    <div className={`flex flex-col h-screen  bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <main className="flex-1 overflow-auto flex w-full">
      {/* <ScalingProvider>{children}</ScalingProvider> */}
      {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="border-t bg-white dark:bg-gray-900 py-2 px-4">
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