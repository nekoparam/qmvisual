"use client"
import { Camera, Upload, X, AlertCircle, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { useSettingsStore } from "@/lib/store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

export default function ImageUploadPage() {
  const [capturedImages, setCapturedImages] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { darkMode } = useSettingsStore()
  const router = useRouter()

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        setCapturedImages(prev => [...prev, imageDataUrl])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setUploadedImages(prev => [...prev, ...newImages])
    }
  }

  const triggerCameraInput = () => {
    cameraInputRef.current?.click()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = (index: number, type: 'captured' | 'uploaded') => {
    if (type === 'captured') {
      setCapturedImages(prev => prev.filter((_, i) => i !== index))
    } else {
      setUploadedImages(prev => prev.filter((_, i) => i !== index))
    }
  }

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
        <div className="rounded-lg border shadow-sm">
          <div className="border-b px-4 py-4">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">拍照</h2>
              <p className="text-sm text-muted-foreground">
                使用相机拍摄照片生成单词卡
              </p>
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
                onChange={handleCameraCapture}
                className="hidden"
                ref={cameraInputRef}
              />
              <Button onClick={triggerCameraInput} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                拍照
              </Button>
              {capturedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {capturedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Captured ${index + 1}`} className="w-full rounded-lg" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 right-1"
                        onClick={() => removeImage(index, 'captured')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="px-4 py-4">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">上传图片</h2>
              <p className="text-sm text-muted-foreground">
                选择多张图片上传以生成单词卡
              </p>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button onClick={triggerFileInput} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                选择图片
              </Button>
              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Uploaded ${index + 1}`} className="w-full rounded-lg" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 right-1"
                        onClick={() => removeImage(index, 'uploaded')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

