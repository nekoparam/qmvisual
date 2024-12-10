"use client"

import { useState } from "react"
import { ArrowLeft, Video, Users2, MoreVertical, UserPlus, LogOut, Check, X, ExternalLink, Search, MonitorUp, Bell, Pin, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { AddPeopleDialog } from "./add-people-dialog"
import { LeaveConfirmDialog } from "./leave-confirm-dialog"

interface ChatHeaderProps {
  title: string
  onBack?: () => void
}

// Mock data for people (unchanged)
const people = [
  { 
    id: '1',
    name: 'latyas',
    avatar: null,
    status: 'offline',
    initial: 'G'
  },
  { 
    id: '2',
    name: 'wangdali',
    isGuest: true,
    avatar: null,
    status: 'online',
    isYou: true,
    initial: 'L'
  },
  { 
    id: '3',
    name: 'Alice Wang',
    isGuest: true,
    avatar: null,
    status: 'offline',
    initial: 'A'
  },
  { 
    id: '4',
    name: 'Vince Zhao',
    avatar: '/avatars/vince.jpg',
    status: 'busy',
    initial: 'V'
  },
  { 
    id: '5',
    name: '小可爱',
    avatar: null,
    status: 'online',
    initial: '小'
  },
  { 
    id: '6',
    name: '钉宫理惠',
    avatar: '/avatars/placeholder.jpg',
    status: 'busy',
    initial: '钉'
  },
  { 
    id: '7',
    name: 'Doll',
    avatar: null,
    status: 'busy',
    initial: 'D'
  },
]

export function ChatHeader({ title, onBack }: ChatHeaderProps) {
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false)
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false)
  const [isPeopleMenuOpen, setIsPeopleMenuOpen] = useState(false)

  const handleAddPeople = (data: {
    identifier: string
    historyOption: "none" | "partial" | "all"
    days?: number
  }) => {
    console.log('Adding person:', data)
    setIsAddPeopleOpen(false)
  }

  const handleLeave = () => {
    console.log('Leaving chat')
    setIsLeaveConfirmOpen(false)
    setIsPeopleMenuOpen(false)
  }

  return (
    <>
      <div className="flex flex-col border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            {
                /*
                返回按钮暂时不知道有什么用，先注释掉
                 */
            }
            {/* <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button> */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {title[0]}
              </div>
              <span className="font-medium">{title}</span>
            </div>
            <Tabs defaultValue="chat" className="ml-8">
              <TabsList className="h-9 bg-transparent p-0">
                <TabsTrigger 
                  value="chat" 
                  className="relative h-9 rounded-none border-0 bg-transparent px-4 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:text-primary"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="shared" 
                  className="relative h-9 rounded-none border-0 bg-transparent px-4 font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:text-primary"
                >
                  Shared
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Popover open={isPeopleMenuOpen} onOpenChange={setIsPeopleMenuOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Users2 className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    7
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[280px] p-0">
                <div className="p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">People (7)</h4>
                </div>
                <div className="px-2">
                  {people.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-accent"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={person.avatar || undefined} />
                        <AvatarFallback className="bg-muted">
                          {person.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">
                            {person.name}
                            {person.isGuest && (
                              <span className="ml-1 text-muted-foreground">(Guest)</span>
                            )}
                          </span>
                          {person.isYou && (
                            <div className="text-xs text-muted-foreground">You</div>
                          )}
                        </div>
                        {person.status === 'online' && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                        {person.status === 'offline' && (
                          <X className="h-4 w-4 text-muted-foreground" />
                        )}
                        {person.status === 'busy' && (
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="p-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2 px-2"
                    onClick={() => setIsAddPeopleOpen(true)}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Add people</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2 px-2 text-red-500 hover:text-red-500"
                    onClick={() => setIsLeaveConfirmOpen(true)}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Leave</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open chat in new window
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Search className="mr-2 h-4 w-4" />
                  Find in chat
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MonitorUp className="mr-2 h-4 w-4" />
                  Screen sharing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users2 className="mr-2 h-4 w-4" />
                  Mark as unread
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pin className="mr-2 h-4 w-4" />
                  Pin
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Mute
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLeaveConfirmOpen(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <AddPeopleDialog
        isOpen={isAddPeopleOpen}
        onClose={() => setIsAddPeopleOpen(false)}
        onAdd={handleAddPeople}
      />

      <LeaveConfirmDialog
        isOpen={isLeaveConfirmOpen}
        onClose={() => setIsLeaveConfirmOpen(false)}
        onConfirm={handleLeave}
      />
    </>
  )
}

