"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WordCardProps {
  word: string
  translation: string
}

export default function WordPage() {
  // 直接在组件中定义默认值，而不是通过props传递
  const word = "abject"
  const translation = "极可怨的; 卑下的"

  return (
    <div className="p-4 w-full flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <div className="bg-blue-500 rounded-lg p-8 text-center text-white mb-4">
            <h2 className="text-4xl font-bold mb-4">{word}</h2>
            <p className="text-xl">{translation}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              onClick={() => console.log("Don't know")}
            >
              不记得
            </Button>
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={() => console.log("Remember")}
            >
              记得
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}