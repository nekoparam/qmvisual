"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  username: string
  role: string
  avatar?: string
  isExternal?: boolean
}

const users: User[] = [
  {
    id: "1",
    name: "Arvin Liu",
    username: "ARVIN.LIU",
    role: "Senior Staff Engineer",
    avatar: null,
  },
  {
    id: "2",
    name: "Alice Zhao",
    username: "ALICE.ZHAO",
    isExternal: true,
    role: "Staff Engineer",
    avatar: null,
  },
  {
    id: "3",
    name: "Jun Wang",
    username: "JUN.WANG",
    role: "Staff Engineer",
    avatar: "/avatars/shunjie.jpg",
  },
  {
    id: "4",
    name: "小寒",
    username: "xiaohan",
    role: "",
    avatar: null,
  },
]

interface AddPeopleDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: {
    userIds: string[]
    historyOption: "none" | "partial" | "all"
    days?: number
  }) => void
}

export function AddPeopleDialog({ isOpen, onClose, onAdd }: AddPeopleDialogProps) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [historyOption, setHistoryOption] = useState<"none" | "partial" | "all">("none")
  const [days, setDays] = useState("1")

  const filteredUsers = users.filter(user => {
    if (!searchQuery) return false
    const searchLower = searchQuery.toLowerCase()
    return (
      !selectedUsers.find(selected => selected.id === user.id) && (
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        (user.role && user.role.toLowerCase().includes(searchLower))
      )
    )
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      userIds: selectedUsers.map(user => user.id),
      historyOption,
      ...(historyOption === "partial" ? { days: parseInt(days) } : {})
    })
    setSelectedUsers([])
    setSearchQuery("")
    setHistoryOption("none")
    setDays("1")
  }

  const handleUserSelect = (user: User) => {
    setSelectedUsers(prev => [...prev, user])
    setSearchQuery("")
  }

  const handleUserRemove = (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.id !== userId))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative space-y-2">
            <div className="flex flex-wrap gap-1 rounded-lg border p-1">
              {selectedUsers.map((user) => (
                <Badge 
                  key={user.id} 
                  variant="secondary"
                  className="gap-1 pl-1 pr-2 py-1 h-7"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs bg-muted">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleUserRemove(user.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[200px] h-7"
              />
            </div>
            {searchQuery && filteredUsers.length > 0 && (
              <div className="absolute z-10 w-full rounded-md border bg-popover shadow-md">
                <div className="py-2">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleUserSelect(user)}
                      className="flex w-full items-center px-4 py-2 hover:bg-accent"
                    >
                      {user.avatar ? (
                        <Avatar className="mr-3 h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="mr-3 h-8 w-8">
                          <AvatarFallback className="bg-muted">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">
                          {user.name}
                          {user.isExternal && " (External)"}
                        </span>
                        {!user.isExternal && (
                          <span className="text-xs text-muted-foreground">
                            ({user.username}) {user.role}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <RadioGroup
            value={historyOption}
            onValueChange={(value) => setHistoryOption(value as typeof historyOption)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">Don&apos;t include chat history</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partial" id="partial" />
              <Label htmlFor="partial" className="flex items-center gap-2">
                Include history from the past number of days:
                <Input
                  type="number"
                  min="1"
                  className="w-16"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={historyOption !== "partial"}
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Include all chat history</Label>
            </div>
          </RadioGroup>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={selectedUsers.length === 0}>
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

