'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { use } from 'react'

interface UserProfile {
  id: string
  name: string
  avatar: string
  bio: string
  wordsLearned: number
  streak: number
}

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    // 在实际应用中，这里应该从API获取用户数据
    // 现在我们使用模拟数据
    const mockUser: UserProfile = {
      id: id,
      name: "学习达人",
      avatar: "/placeholder.svg?height=128&width=128",
      bio: "热爱学习英语，目标是掌握10000个单词！",
      wordsLearned: 2500,
      streak: 30
    }
    setUser(mockUser)
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-background bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden dark:text-text-dark"
    >
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">用户资料</h1>
        <div className="w-8" /> {/* 为了保持标题居中 */}
      </header>

      <main className="flex-1 p-4 space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-center text-muted-foreground">{user.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已学单词</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.wordsLearned}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">连续学习</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.streak} 天</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-4">
          <Button className="flex-1" variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            发消息
          </Button>
          <Button className="flex-1">
            <UserPlus className="mr-2 h-4 w-4" />
            添加好友
          </Button>
        </div>
      </main>
    </motion.div>
  )
}

