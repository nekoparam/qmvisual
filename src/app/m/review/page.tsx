"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WordCardProps {
  word: string
  translation: string
}

const words: WordCardProps[] = [
  { word: "abject", translation: "极可怨的; 卑下的" },
  { word: "ephemeral", translation: "短暂的; 瞬息的" },
  { word: "ubiquitous", translation: "无处不在的; 普遍存在的" },
]

export default function ReviewPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)

  const currentWord = words[currentWordIndex]

  const handleNext = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    setShowTranslation(false)
  }

  const handleShowTranslation = () => {
    setShowTranslation(true)
  }

  return (
    <div className="p-4 w-full flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <div className="bg-blue-500 rounded-lg p-8 text-center text-white mb-4">
            <h2 className="text-4xl font-bold mb-4">{currentWord.word}</h2>
            {showTranslation && <p className="text-xl">{currentWord.translation}</p>}
          </div>
          <div className="flex flex-col gap-4">
            {!showTranslation && (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={handleShowTranslation}
              >
                显示翻译
              </Button>
            )}
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={handleNext}
            >
              下一个单词
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}