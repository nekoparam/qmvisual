import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FilePreviewProps {
  file: File
  onRemove: () => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const fileSize = (file.size / 1024).toFixed(2) + 'kB'
  
  return (
    <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
        {file.type.startsWith('image/') ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <div className="h-6 w-6 rounded-md bg-muted" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{file.name}</span>
        <span className="text-xs text-muted-foreground">{fileSize}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto h-8 w-8"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

