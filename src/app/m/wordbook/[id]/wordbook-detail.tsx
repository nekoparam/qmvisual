"use client"
import { Book, ChevronLeft, Camera, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useSettingsStore } from "@/lib/store"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WordbookDetailProps {
  wordbook: {
    id: string
    name: string
    wordCount: number
    lastUpdated: string
  }
}

export function WordbookDetail({ wordbook }: WordbookDetailProps) {
  const { darkMode } = useSettingsStore()
  const router = useRouter()

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
            <Book className="w-5 h-5" />
            单词书详情
          </h1>
        </div>
      </div>
      <div className="px-4 py-2 mt-16">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>{wordbook.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>单词数量：{wordbook.wordCount}</p>
            <p>最后更新：{wordbook.lastUpdated}</p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => router.push(`/m/wordbook/${wordbook.id}/image-upload`)}
          >
            <Camera className="w-4 h-4 mr-2" />
            通过拍照添加词汇
          </Button>
          <Button variant="outline" className="w-full">
            <Edit className="w-4 h-4 mr-2" />
            编辑单词书
          </Button>
          <Button variant="destructive" className="w-full">
            <Trash2 className="w-4 h-4 mr-2" />
            删除单词书
          </Button>
        </div>
      </div>
    </div>
  )
}

