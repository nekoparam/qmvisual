'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, MoreVertical, Send } from 'lucide-react'
import { motion } from 'framer-motion'

interface Message {
  id: number
  sender: string
  senderId: string
  content: string
  timestamp: string
  isSelf: boolean
}

const mockMessages: Message[] = [
  { id: 1, sender: "用户1", senderId: "user1", content: "大家好，今天背了多少单词？", timestamp: "09:00", isSelf: false },
  { id: 2, sender: "你", senderId: "self", content: "我今天背了50个新单词！", timestamp: "09:05", isSelf: true },
  { id: 3, sender: "用户2", senderId: "user2", content: "太棒了！我背了30个，感觉越来越有效率了。", timestamp: "09:10", isSelf: false },
  { id: 4, sender: "你", senderId: "self", content: "确实，我觉得使用这个app帮助很大。", timestamp: "09:15", isSelf: true },
  { id: 5, sender: "用户3", senderId: "user3", content: "同意！我们互相鼓励，一起进步！", timestamp: "09:20", isSelf: false },
]

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "你",
        senderId: "self",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleAvatarClick = (senderId: string) => {
    if (senderId !== 'self') {
      router.push(`/m/user/${senderId}`)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-background bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden  dark:text-text-dark"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">背单词交流群</h1>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[70%] ${message.isSelf ? 'flex-row-reverse' : ''}`}>
                <Avatar 
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => handleAvatarClick(message.senderId)}
                >
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-3 ${message.isSelf ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="输入消息..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

