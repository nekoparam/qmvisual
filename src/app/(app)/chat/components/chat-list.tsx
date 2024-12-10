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
}

const chats: ChatItem[] = [
  {
    id: "1",
    name: "教 zzj 一点 wwl",
    lastMessage: "为啥 figma，直接 code 了都",
    timestamp: "14:49",
    unread: 2,
  },
  {
    id: "2",
    name: "纳斯达克韭菜交流群",
    lastMessage: "to code 都有了，to figma 应该没卵用",
    timestamp: "14:49",
  },
  {
    id: "3",
    name: "quantmew 柚子群",
    lastMessage: "现在我就是给的 v0",
    timestamp: "14:48",
    unread: 1,
  },
]

export function ChatList() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-1 p-2">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className={cn(
              "h-auto justify-start gap-2 p-2",
              "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Avatar className="size-12">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col items-start gap-1 overflow-hidden">
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-medium">{chat.name}</span>
                <span className="text-xs text-muted-foreground">
                  {chat.timestamp}
                </span>
              </div>
              <span className="w-full truncate text-sm text-muted-foreground">
                {chat.lastMessage}
              </span>
            </div>
            {chat.unread && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {chat.unread}
              </span>
            )}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

