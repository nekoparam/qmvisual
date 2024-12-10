import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

interface FileDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  file: {
    filename: string
    size: number
    uploadedAt: string
    url?: string
  }
}

export function FileDetailsModal({ isOpen, onClose, file }: FileDetailsModalProps) {
  const formattedSize = (file.size / 1024).toFixed(2) + 'kB'
  
  const handleDownload = () => {
    if (file.url) {
      window.open(file.url, '_blank')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>文件详情</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="font-medium">文件名称</div>
            <div className="col-span-2">{file.filename}</div>
            
            <div className="font-medium">文件大小</div>
            <div className="col-span-2">{formattedSize}</div>
            
            <div className="font-medium">上传时间</div>
            <div className="col-span-2">{file.uploadedAt}</div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleDownload}
            disabled={!file.url}
          >
            <Download className="mr-2 h-4 w-4" />
            点击下载
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

