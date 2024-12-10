"use client"

import { useState, useRef, useEffect } from "react"
import { ChatInput } from "./components/input"
import { ChatList } from "./components/chat-list"
import { ChatMessage } from "./components/message"
import { ScrollArea } from "@/components/ui/scroll-area"


interface Attachment {
    type: 'image' | 'file'
    url: string
    filename: string
    size: number
    uploadedAt: string
  }
  
  interface Message {
    id: string
    message: string
    sender: {
      name: string
      avatar?: string
      isMe?: boolean
    }
    timestamp: string
    attachments?: Attachment[]
  }
  
  const initialMessages: Message[] = [
    {
      id: "1",
      message: "为啥 figma，直接 code 了都",
      sender: {
        name: "Jarvis",
        avatar: "/avatars/01.png",
      },
      timestamp: "14:49",
      attachments: [
        {
          type: 'file',
          url: '#',
          filename: 'a4.drawio',
          size: 89130, // 89.13kB
          uploadedAt: '2024-03-19 14:49:00'
        }
      ]
    },
    {
      id: "2",
      message: "看看这个设计",
      sender: {
        name: "Me",
        isMe: true,
        avatar: "/avatars/02.png",
      },
      timestamp: "14:50",
      attachments: [
        {
          type: 'image',
          url: '/placeholder.svg',
          filename: 'design.png',
          size: 1024000, // 1MB
          uploadedAt: '2024-03-19 14:50:00'
        }
      ]
    },
    {
      id: "3",
      message: "因为，想改效果图",
      sender: {
        name: "Me",
        isMe: true,
        avatar: "/avatars/02.png",
      },
      timestamp: "14:50",
    },
    {
      id: "4",
      message: "不过你说的对",
      sender: {
        name: "Me",
        isMe: true,
        avatar: "/avatars/02.png",
      },
      timestamp: "14:50",
    },
    {
      id: "5",
      message: "为什么我不 PS 改",
      sender: {
        name: "Me",
        isMe: true,
        avatar: "/avatars/02.png",
      },
      timestamp: "14:51",
    },
  ]
  
export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const messagesEndRef = useRef<HTMLDivElement>(null)
  
    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages])
  
    const addMessage = (newMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, newMessage])
    }
  
    return (
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <div className="w-80 border-r">
          <ChatList />
        </div>
        <div className="flex flex-1 flex-col">
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 p-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <ChatInput onSendMessage={addMessage} />
        </div>
      </div>
    )
  }
  