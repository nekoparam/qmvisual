"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

interface User {
  id: string
  name: string
  username: string
  role: string
}

const users: User[] = [
  {
    id: "1",
    name: "Arvin Zhou",
    username: "ARVIN.ZHOU",
    role: "Senior Staff Engineer",
  },
  {
    id: "2",
    name: "Alice Smith",
    username: "ALICE.SMITH",
    role: "Product Manager",
  },
  {
    id: "3",
    name: "Bob Johnson",
    username: "BOB.JOHNSON",
    role: "Software Engineer",
  },
]

interface UserComboboxProps {
  value: string
  onChange: (value: string) => void
}

export function UserCombobox({ value, onChange }: UserComboboxProps) {
  return (
    <Command className="rounded-lg border shadow-none">
      <CommandInput 
        placeholder="Search users..." 
        className="border-0 focus:ring-0"
      />
      <CommandEmpty>No user found.</CommandEmpty>
      <CommandGroup className="p-0">
        {users.map((user) => (
          <CommandItem
            key={user.id}
            value={`${user.name} ${user.username} ${user.role}`}
            onSelect={() => onChange(user.id)}
            className="px-4 py-2 aria-selected:bg-accent"
          >
            <Avatar className="mr-3 h-10 w-10">
              <AvatarFallback className="bg-muted text-muted-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-muted-foreground">
                ({user.username}) {user.role}
              </span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  )
}

