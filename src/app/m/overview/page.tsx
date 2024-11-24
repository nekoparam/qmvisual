"use client"

import { useState, useEffect } from 'react'
import { Book, CheckCircle, Clock, TrendingUp, BarChart2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "./components/sheet"
import { Button } from "@/components/ui/button"

// Mock data for word books with three-level categorization
const wordBooks = [
  {
    language: '英语',
    examTypes: [
      {
        name: 'IELTS',
        books: [
          { id: '1', name: 'IELTS Academic Vocabulary' },
          { id: '2', name: 'IELTS General Training Vocabulary' },
        ]
      },
      {
        name: 'TOEFL',
        books: [
          { id: '3', name: 'TOEFL Core Vocabulary' },
          { id: '4', name: 'TOEFL Advanced Vocabulary' },
        ]
      },
    ]
  },
  {
    language: '日语',
    examTypes: [
      {
        name: 'JLPT',
        books: [
          { id: '5', name: 'JLPT N5 Vocabulary' },
          { id: '6', name: 'JLPT N4 Vocabulary' },
          { id: '7', name: 'JLPT N3 Vocabulary' },
        ]
      },
    ]
  },
]

// Mock data for book statistics
const bookStats = {
  remainingWords: 150,
  completionCount: 3,
  averageCompletionTime: 45, // in minutes
}

// Mock data for completion interval trend
const completionIntervalTrend = [
  { date: '05/01', interval: 7 },
  { date: '05/08', interval: 6 },
  { date: '05/14', interval: 5 },
  { date: '05/19', interval: 4 },
  { date: '05/23', interval: 3 },
]

export default function ListPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('英语')
  const [selectedExamType, setSelectedExamType] = useState('IELTS')
  const [selectedBook, setSelectedBook] = useState('1')
  const [tempSelection, setTempSelection] = useState({ language: '', examType: '', book: '' })
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  useEffect(() => {
    // Set initial selections
    setTempSelection({ language: selectedLanguage, examType: selectedExamType, book: selectedBook })
  }, [])

  const handleLanguageChange = (value: string) => {
    setTempSelection(prev => ({ ...prev, language: value, examType: '', book: '' }))
  }

  const handleExamTypeChange = (value: string) => {
    setTempSelection(prev => ({ ...prev, examType: value, book: '' }))
  }

  const handleBookChange = (value: string) => {
    setTempSelection(prev => ({ ...prev, book: value }))
    if (value !== selectedBook && selectedBook !== '') {
      setIsConfirmationOpen(true)
    } else {
      confirmSelection()
    }
  }

  const confirmSelection = () => {
    setSelectedLanguage(tempSelection.language)
    setSelectedExamType(tempSelection.examType)
    setSelectedBook(tempSelection.book)
    setIsConfirmationOpen(false)
  }

  const cancelSelection = () => {
    setTempSelection({ language: selectedLanguage, examType: selectedExamType, book: selectedBook })
    setIsConfirmationOpen(false)
  }

  const currentLanguage = wordBooks.find(lang => lang.language === tempSelection.language)
  const currentExamType = currentLanguage?.examTypes.find(exam => exam.name === tempSelection.examType)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden  dark:text-text-dark">
      <div className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b">
        <h1 className="px-4 py-3.5 text-xl font-medium flex items-center gap-2">
        <BarChart2 className="w-5 h-5" />
          概览
        </h1>
      </div>
      
      <div className="px-4 py-2 mt-16">
        {/* 完成间隔趋势 */}
        <Card className="mb-6">   
            <CardHeader>
              <CardTitle className="text-sm font-medium">完成间隔趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionIntervalTrend} margin={{ top: 10, right: 10, left: -20, bottom: 6 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    label={{ 
                      value: '日期', 
                      style: { fontSize: '12px' },
                      position: 'insideBottom',
                      offset: -1
                    }}
                    />
                  <YAxis 
                    fontSize={12} 
                    label={{ 
                        value: '完成间隔（天）', 
                        angle: -90, 
                        style: { fontSize: '12px' }
                      }} 
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="interval" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </CardContent>
        </Card>



        {/* Book Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium whitespace-nowrap">剩余单词</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{bookStats.remainingWords}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium whitespace-nowrap">完成次数</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{bookStats.completionCount}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium whitespace-nowrap">平均完成时间</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{bookStats.averageCompletionTime}分钟</div>
            </CardContent>
        </Card>
        </div>

        {/* Three-level Word Book Selection */}
        <Card className="mb-6">
            <CardHeader>
            <CardTitle className="text-sm font-medium">选择单词书</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <Select value={tempSelection.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                <SelectValue placeholder="选择语言" />
                </SelectTrigger>
                <SelectContent>
                {wordBooks.map((lang) => (
                    <SelectItem key={lang.language} value={lang.language}>
                    {lang.language}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>

            {tempSelection.language && (
                <Select value={tempSelection.examType} onValueChange={handleExamTypeChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择考试类别" />
                </SelectTrigger>
                <SelectContent>
                    {currentLanguage?.examTypes.map((exam) => (
                    <SelectItem key={exam.name} value={exam.name}>
                        {exam.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            )}

            {tempSelection.examType && (
                <Select value={tempSelection.book} onValueChange={handleBookChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择词汇书" />
                </SelectTrigger>
                <SelectContent>
                    {currentExamType?.books.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                        {book.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            )}
            </CardContent>
        </Card>

      </div>

      {/* Confirmation Dialog */}
      <Sheet open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>确认切换单词书</SheetTitle>
            <SheetDescription>
              您确定要切换到新的单词书吗？这可能会影响您的学习进度。
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex justify-center gap-4 mt-4 dark:text-text-dark">
            <Button onClick={confirmSelection}>确认</Button>
            <Button variant="outline" onClick={cancelSelection}>取消</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}