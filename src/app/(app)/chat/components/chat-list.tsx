import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatItem {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread?: number
  isPinned?: boolean
  isActive?: boolean
  initial: string
}

const chats: ChatItem[] = [
  {
    id: "1",
    name: "小寒角色开发讨论",
    initial: "小",
    lastMessage: "项目终于新建文件夹了，一切顺利",
    timestamp: "14:49",
    unread: 2,
    isPinned: true,
    isActive: true,
  },
  {
    id: "2",
    name: "纳斯达克韭菜交流群",
    initial: "纳",
    lastMessage: "YINN 要归零了",
    timestamp: "14:49",
  },
  {
    id: "3",
    name: "quantmew 柚子群",
    initial: "q",
    lastMessage: "我为什么天天亏钱",
    timestamp: "14:48",
    unread: 1,
  },
]

export function ChatList() {
  const pinnedChats = chats.filter(chat => chat.isPinned)
  const recentChats = chats.filter(chat => !chat.isPinned)

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col p-2">
        {pinnedChats.length > 0 && (
          <div className="space-y-1">
            <div className="px-2 py-1.5">
              <span className="text-sm font-medium text-muted-foreground">Pinned</span>
            </div>
            {pinnedChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        )}
        
        <div className="space-y-1">
          <div className="px-2 py-1.5">
            <span className="text-sm font-medium text-muted-foreground">Recent</span>
          </div>
          {recentChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

function ChatItem({ chat }: { chat: ChatItem }) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        className={cn(
          "h-auto w-full justify-start gap-3 p-2",
          "hover:bg-accent/50",
          chat.isActive ? "bg-accent/50" : "bg-accent/10"
        )}
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-muted">
            {chat.initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium">{chat.name}</span>
            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
          </div>
          <span className="text-sm text-muted-foreground line-clamp-1">
            {chat.lastMessage}
          </span>
        </div>
      </Button>
      {chat.unread && (
        <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <span className="text-xs font-medium text-primary-foreground">
            {chat.unread}
          </span>
        </div>
      )}
    </div>
  )
}

