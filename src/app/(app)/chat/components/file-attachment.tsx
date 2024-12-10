"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FileDetailsModal } from "./file-details-modal"

interface FileAttachmentProps {
  filename: string
  size: number
  uploadedAt: string
  url?: string
  className?: string
}

export function FileAttachment({ filename, size, uploadedAt, url, className }: FileAttachmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const formattedSize = (size / 1024).toFixed(2) + 'kB'
  
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "flex flex-col gap-1 rounded-md border bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors",
          className
        )}
      >
        <span className="text-sm font-medium">{filename}</span>
        <span className="text-xs text-muted-foreground">{formattedSize}</span>
      </div>

      <FileDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={{ filename, size, uploadedAt, url }}
      />
    </>
  )
}

