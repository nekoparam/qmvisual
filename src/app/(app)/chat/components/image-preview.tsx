"use client"

import { useState, useRef, useCallback } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ZoomIn, ZoomOut, MoveIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ImagePreviewProps {
  src: string
  alt?: string
  className?: string
}

export function ImagePreview({ src, alt, className }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  const imageRef = useRef<HTMLImageElement>(null)

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5))
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn("cursor-pointer rounded-md", className)}
        onDoubleClick={() => setIsOpen(true)}
      />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh]">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2 z-50">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            
            <div
              className={cn(
                "relative cursor-move",
                isDragging && "cursor-grabbing"
              )}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={src}
                alt={alt}
                draggable="false"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.2s',
                }}
                className="max-h-[80vh] w-auto object-contain select-none"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

