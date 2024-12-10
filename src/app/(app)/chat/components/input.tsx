"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Smile, Paperclip, ImageIcon, Send } from 'lucide-react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FilePreview } from "./file-preview"

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

interface ChatInputProps {
  onSendMessage: (message: Message) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  const handleSubmit = async () => {
    if (!message.trim() && attachments.length === 0) return

    const newAttachments: Attachment[] = await Promise.all(
      attachments.map(async (file) => {
        const fakeUrl = URL.createObjectURL(file)
        return {
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: fakeUrl,
          filename: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString()
        }
      })
    )

    const newMessage: Message = {
      id: Date.now().toString(),
      message: message.trim(),
      sender: {
        name: "Me",
        isMe: true,
        avatar: "/avatars/02.png",
      },
      timestamp: new Date().toLocaleTimeString(),
      attachments: newAttachments
    }

    onSendMessage(newMessage)
    setMessage("")
    setAttachments([])
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const cursor = textareaRef.current?.selectionStart || message.length
    const newMessage = 
      message.slice(0, cursor) + 
      emojiData.emoji + 
      message.slice(cursor)
    setMessage(newMessage)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setAttachments(prev => [...prev, ...files])
    if (event.target) event.target.value = ''
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setAttachments(prev => [...prev, ...files])
    if (event.target) event.target.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }, [message, attachments])

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }} className="flex flex-col gap-4 border-t bg-background p-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              onRemove={() => removeAttachment(index)}
            />
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" size="icon" variant="ghost">
                <Smile className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="mb-2 w-full p-0" 
              side="top" 
              align="start"
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width="100%"
              />
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="size-5" />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="size-5" />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
          </Button>
        </div>

        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[40px] max-h-[200px] resize-none"
          rows={1}
        />

        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim() && attachments.length === 0}
        >
          <Send className="size-5" />
        </Button>
      </div>
    </form>
  )
}

