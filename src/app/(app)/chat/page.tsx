"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"

import { ChatInput } from "./components/input"
import { ChatList } from "./components/chat-list"
import { ChatMessage } from "./components/message"
import { ChatHeader } from "./components/chat-header"
import { ScrollArea } from "./components/scroll-area"


import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  
  interface SearchResult {
    type: 'group' | 'team'
    name: string
    description?: string
    avatar?: string
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
          size: 89130,
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
          size: 1024000,
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
  
  // Mock search results - replace with actual search logic
  const mockSearchResults: SearchResult[] = [
    {
      type: 'group',
      name: 'Backend 讨论',
      description: 'latyas (Guest), +6',
      avatar: '/avatars/01.png'
    },
    {
      type: 'team',
      name: '[External] Frontend',
      avatar: '/avatars/02.png'
    }
  ]
  
  export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
  
    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages])
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-search-container]')) {
          setIsSearching(false);
        }
      };
  
      if (isSearching) {
        document.addEventListener('click', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isSearching]);
  
    const addMessage = (newMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, newMessage])
    }
  
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
      if (query.length > 0) {
        setIsSearching(true)
        // Replace this with actual search logic
        setSearchResults(mockSearchResults)
      } else {
        setIsSearching(false)
        setSearchResults([])
      }
    }
  
    const handleSearchInputFocus = () => {
      if (searchQuery.length > 0) {
        setIsSearching(true)
      }
    }
  
  
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="border-b p-2 relative" data-search-container>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search (Cmd+E)" 
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setSearchQuery("")
                  setIsSearching(false)
                  setSearchResults([])
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {isSearching && (
            <div 
              className="absolute left-0 right-0 top-full mt-1 bg-background border rounded-md shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Tabs defaultValue="messages" className="p-4">
                <TabsList className="mb-4">
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="groups">Group Chats</TabsTrigger>
                  <TabsTrigger value="teams">Teams and Channels</TabsTrigger>
                </TabsList>
                <TabsContent value="messages">
                  <div className="text-sm text-muted-foreground">
                    No messages found.
                  </div>
                </TabsContent>
                <TabsContent value="files">
                  <div className="text-sm text-muted-foreground">
                    No files found.
                  </div>
                </TabsContent>
                <TabsContent value="groups">
                  <div className="space-y-4">
                    {searchResults.filter(r => r.type === 'group').map((result) => (
                      <div
                        key={result.name}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage src={result.avatar} />
                          <AvatarFallback>{result.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{result.name}</div>
                          {result.description && (
                            <div className="text-sm text-muted-foreground">
                              {result.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="teams">
                  <div className="space-y-4">
                    {searchResults.filter(r => r.type === 'team').map((result) => (
                      <div
                        key={result.name}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                          {result.name.slice(0, 2)}
                        </div>
                        <div className="font-medium">{result.name}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="border-t p-4">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  View all results
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-8rem)]">
          <div className="w-80 border-r">
            <ChatList />
          </div>
          <div className="flex flex-1 flex-col">
            <ChatHeader 
              title="小寒角色开发讨论"
              onBack={() => console.log('Back clicked')}
            />
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
      </div>
    )
  }
  