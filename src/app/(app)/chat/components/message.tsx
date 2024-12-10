import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ImagePreview } from "./image-preview"
import { FileAttachment } from "./file-attachment"

interface Attachment {
  type: 'image' | 'file'
  url: string
  filename: string
  size: number
  uploadedAt: string
}

interface ChatMessageProps {
  message: string
  sender: {
    name: string
    avatar?: string
    isMe?: boolean
  }
  timestamp: string
  attachments?: Attachment[]
}

export function ChatMessage({ message, sender, timestamp, attachments = [] }: ChatMessageProps) {
  const isMe = sender.isMe

  return (
    <div className={cn("flex gap-2 px-4", isMe ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="mt-1 size-10 shrink-0">
        <AvatarImage src={sender.avatar} alt={sender.name} />
        <AvatarFallback>{sender.name[0]}</AvatarFallback>
      </Avatar>
      <div className={cn("flex max-w-[70%] flex-col gap-1", isMe && "items-end")}>
        {!isMe && (
          <span className="text-sm text-muted-foreground">{sender.name}</span>
        )}
        <div
          className={cn(
            "flex flex-col gap-2 rounded-2xl px-4 py-2",
            isMe ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {message && <p>{message}</p>}
          {attachments.length > 0 && (
            <div className="flex flex-col gap-2">
              {attachments.map((attachment, index) => (
                attachment.type === 'image' ? (
                  <ImagePreview
                    key={index}
                    src={attachment.url}
                    alt={attachment.filename}
                    className="max-w-[300px] max-h-[200px] object-cover"
                  />
                ) : (
                  <FileAttachment
                    key={index}
                    filename={attachment.filename}
                    size={attachment.size}
                    uploadedAt={attachment.uploadedAt}
                    url={attachment.url}
                  />
                )
              ))}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
    </div>
  )
}

