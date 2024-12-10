'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GroupActionsSheet } from './components/group-actions-sheet'

interface Message {
  id: number
  avatar: string
  name: string
  lastMessage: string
  time: string
  unread?: number
}

const messages: Message[] = [
  {
    id: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "背单词交流群",
    lastMessage: "加油，今天也要好好背单词！",
    time: "12:17",
    unread: 3
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "单词打卡群",
    lastMessage: "已打卡，继续保持",
    time: "11:39"
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    name: "词根词缀学习",
    lastMessage: "今天学习了 -able 后缀",
    time: "10:24",
    unread: 1
  }
]

export default function MessagePage() {
  const router = useRouter()
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-background bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden  dark:text-text-dark"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">消息</h1>
        <div className="flex items-center gap-2">
          <GroupActionsSheet />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索"
            className="pl-9 bg-muted/50"
          />
        </div>
      </div>

      {/* Message List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer" onClick={() => router.push(`/m/message/${message.id}`)}>
              <Avatar className="h-12 w-12">
                <AvatarImage src={message.avatar} alt={message.name} />
                <AvatarFallback>{message.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{message.name}</span>
                  <span className="text-sm text-muted-foreground">{message.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate">
                    {message.lastMessage}
                  </span>
                  {message.unread && (
                    <Badge variant="destructive" className="rounded-full">
                      {message.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  )
}

