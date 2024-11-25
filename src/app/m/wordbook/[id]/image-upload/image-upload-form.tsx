"use client"
import { Camera, Upload, X, AlertCircle, ChevronLeft, Book, Trash2, Eye, GripVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef, useCallback, useEffect } from "react"
import { useSettingsStore } from "@/lib/store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ImageUploadFormProps {
  wordbook: {
    id: string
    name: string
  }
}

interface ImageItem {
  id: string
  name: string
  url: string
}

export function ImageUploadForm({ wordbook }: ImageUploadFormProps) {
  const [images, setImages] = useState<ImageItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [dragPosition, setDragPosition] = useState<number | null>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const { darkMode } = useSettingsStore()
  const router = useRouter()

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file)
      }))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.effectAllowed = 'move'
    setDraggedItem(index)
    setDragPosition(index)
  }

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === index) return
    setDragPosition(index)
  }, [draggedItem])

  const handleDragEnd = () => {
    if (draggedItem !== null && dragPosition !== null) {
      setImages(prevImages => {
        const newImages = [...prevImages]
        const [draggedImage] = newImages.splice(draggedItem, 1)
        newImages.splice(dragPosition, 0, draggedImage)
        return newImages
      })
    }
    setDraggedItem(null)
    setDragPosition(null)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLLIElement>, index: number) => {
    const touch = e.touches[0]
    setDraggedItem(index)
    setDragPosition(index)
    setTouchStartY(touch.clientY)

    // 设置初始位置
    const item = e.currentTarget
    const rect = item.getBoundingClientRect()
    item.style.position = 'relative'
    item.style.zIndex = '50'
    item.style.transform = 'scale(1.02)'
    item.style.transition = 'transform 0.2s ease'
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()
    if (draggedItem === null || touchStartY === null || !listRef.current) return

    const touch = e.touches[0]
    const list = listRef.current
    const items = Array.from(list.children) as HTMLLIElement[]
    const draggedElement = items[draggedItem]
    const itemHeight = draggedElement.offsetHeight
    const currentY = touch.clientY
    const deltaY = currentY - touchStartY

    // 更新拖拽元素位置
    draggedElement.style.transform = `translate3d(0, ${deltaY}px, 0) scale(1.02)`

    // 计算当前位置对应的索引
    const newPosition = Math.max(0, Math.min(
      Math.round((deltaY + itemHeight / 2) / itemHeight) + draggedItem,
      items.length - 1
    ))

    if (newPosition !== dragPosition) {
      // 更新其他元素的位置
      items.forEach((item, index) => {
        if (index !== draggedItem) {
          const shouldMove = draggedItem < newPosition ?
            (index > draggedItem && index <= newPosition) :
            (index < draggedItem && index >= newPosition)

          item.style.transform = shouldMove ?
            `translate3d(0, ${draggedItem < newPosition ? -itemHeight : itemHeight}px, 0)` :
            'translate3d(0, 0, 0)'
          item.style.transition = 'transform 0.3s ease'
        }
      })
      setDragPosition(newPosition)
    }
  }, [draggedItem, touchStartY, dragPosition])

  const handleTouchEnd = () => {
    if (listRef.current && draggedItem !== null && dragPosition !== null) {
      const items = Array.from(listRef.current.children) as HTMLLIElement[]
      
      // 重置所有元素的样式
      items.forEach(item => {
        item.style.transform = ''
        item.style.transition = 'transform 0.3s ease'
        setTimeout(() => {
          item.style.position = ''
          item.style.zIndex = ''
          item.style.transition = ''
        }, 300)
      })

      // 更新数组顺序
      setImages(prevImages => {
        const newImages = [...prevImages]
        const [draggedImage] = newImages.splice(draggedItem, 1)
        newImages.splice(dragPosition, 0, draggedImage)
        return newImages
      })
    }

    setDraggedItem(null)
    setDragPosition(null)
    setTouchStartY(null)
  }

  useEffect(() => {
    if (draggedItem !== null) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      document.addEventListener('touchcancel', handleTouchEnd)
    }
    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [draggedItem, handleTouchMove])

  return (
    <div className={`w-full pt-3 ${darkMode ? 'dark text-text-dark' : ''}`}>
      <div className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b">
        <div className="px-4 py-3.5 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-1" 
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium flex items-center gap-2">
            <Camera className="w-5 h-5" />
            拍照/上传图片
          </h1>
        </div>
      </div>
      <div className="px-4 py-2 mt-16">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              <span className="font-medium">当前正在操作：</span>
              <span>{wordbook.name}</span>
            </div>
          </CardContent>
        </Card>
        <div className="rounded-lg border shadow-sm p-4">
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              className="hidden"
              ref={cameraInputRef}
            />
            <Button onClick={triggerCameraInput} className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              拍照
            </Button>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageCapture}
              className="hidden"
              ref={fileInputRef}
            />
            <Button onClick={triggerFileInput} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              选择图片
            </Button>
          </div>
        </div>
        {images.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-4">已上传的图片</h2>
          <ul ref={listRef} className="space-y-2">
            {images.map((image, index) => (
              <li
                key={image.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, index)}
                className={`flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg will-change-transform`}
                style={{
                  touchAction: 'none',
                }}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <GripVertical className="h-5 w-5 text-gray-500 cursor-move" />
                  <span className="font-medium">{index + 1}.</span>
                  <img src={image.url} alt={image.name} className="w-16 h-16 object-cover rounded" />
                  <span className="text-sm truncate max-w-[150px]">{image.name}</span>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[85vw] max-w-[400px] p-0 overflow-hidden">
                      <div className="flex flex-col h-[50vh] max-h-[400px]">
                        <DialogHeader className="px-4 pt-4 pb-2 shrink-0">
                          <DialogTitle className="pr-6 break-all text-sm">
                            {image.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="relative flex-1 overflow-hidden px-4 pb-4">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src={image.url} 
                              alt={image.name} 
                              className="max-w-[calc(100%-2rem)] max-h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => removeImage(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  )
}

