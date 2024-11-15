"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)

  return (
    <div className="w-full">
      <h1 className="px-4 py-2 text-2xl font-bold">设置</h1>
      
      <div className="px-4 py-2">
        <div className="rounded-lg border bg-white shadow-sm">
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
                onCheckedChange={setDarkMode}
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
                onCheckedChange={setNotifications}
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
                onCheckedChange={setAutoPlay}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}