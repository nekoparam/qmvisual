"use client"
import { Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useSettingsStore } from "@/lib/store"

export default function SettingsPage() {
  const { 
    darkMode, 
    notifications, 
    autoPlay, 
    toggleDarkMode, 
    toggleNotifications, 
    toggleAutoPlay 
  } = useSettingsStore()

  return (
    <div className="w-full pt-3 dark:text-text-dark">
      <div className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b">
        <h1 className="px-4 py-3.5 text-xl font-medium flex items-center gap-2">
        <Settings className="w-5 h-5" />
          设置
        </h1>
      </div>
      <div className="px-4 py-2 mt-16">
        <div className="rounded-lg border shadow-sm">
          <div className="border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">深色模式</Label>
                <p className="text-sm text-muted-foreground">
                  调整应用的显示主题
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </div>
          
          <div className="border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base">推送通知</Label>
                <p className="text-sm text-muted-foreground">
                  接收学习提醒和新内容通知
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={toggleNotifications}
              />
            </div>
          </div>
          
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-play" className="text-base">自动播放发音</Label>
                <p className="text-sm text-muted-foreground">
                  显示新单词时自动播放发音
                </p>
              </div>
              <Switch
                id="auto-play"
                checked={autoPlay}
                onCheckedChange={toggleAutoPlay}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}