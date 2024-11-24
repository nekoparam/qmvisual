"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, BookOpen, Zap, CalendarRange } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/sheet"
import { Calendar } from "./components/calendar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DateRange } from "react-day-picker"



// 模拟的学习记录数据
const learningData = [
  { date: "2023-05-20", newWords: 15, reviewedWords: 30, masteredWords: 10, difficultWords: ["ephemeral", "ubiquitous", "paradigm"] },
  { date: "2023-05-19", newWords: 12, reviewedWords: 25, masteredWords: 8, difficultWords: ["serendipity", "eloquent", "pragmatic"] },
  { date: "2023-05-18", newWords: 18, reviewedWords: 35, masteredWords: 12, difficultWords: ["esoteric", "quintessential", "juxtapose"] },
  { date: "2023-05-17", newWords: 10, reviewedWords: 20, masteredWords: 5, difficultWords: ["ambiguous", "cognizant", "ephemeral"] },
  { date: "2023-05-16", newWords: 14, reviewedWords: 28, masteredWords: 9, difficultWords: ["paradigm", "ubiquitous", "eloquent"] },
]

export default function ProgressPage() {
  const [selectedDate, setSelectedDate] = useState(learningData[0].date)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 4, 16),
    to: new Date(2023, 4, 20)
  })
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  
  const selectedData = learningData.find(data => data.date === selectedDate)
  const chartData = learningData.slice().reverse()

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range)
    if (range?.from && range?.to) {
      setIsSheetOpen(false)
    }
  }

  const handleDayClick = (day: Date | undefined) => {
    if (!day || !dateRange) return;

    // 如果已经选择了完整范围，重新开始选择
    if (dateRange?.from && dateRange?.to) {
      handleRangeSelect({ from: day, to: undefined });
      return;
    }

    // 如果只有开始日期，正常继续选择结束日期
    if (dateRange?.from && !dateRange?.to && day > dateRange.from) {
      handleRangeSelect({ ...dateRange, to: day });
      return;
    }

    // 开始新的选择
    handleRangeSelect({ from: day, to: undefined });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden  dark:text-text-dark">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b">
        <h1 className="px-4 py-3.5 text-xl font-medium flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          学习记录
        </h1>
      </div>

      <div className="flex-1 mt-[52px] pb-16">
        <div className="p-3 space-y-4">
          {/* 趋势图 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-4">学习趋势</h2>
            <div className="h-[200px] -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="newWords" 
                    stroke="#8B5CF6" 
                    name="新单词"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reviewedWords" 
                    stroke="#10B981" 
                    name="复习单词"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="masteredWords" 
                    stroke="#F59E0B" 
                    name="掌握单词"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 日期选择 */}
          <div className="relative flex items-center">
            <div className="flex-1 flex gap-2 overflow-x-auto pb-2 mr-12">
              {learningData.map((data) => (
                <button
                  key={data.date}
                  onClick={() => setSelectedDate(data.date)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    selectedDate === data.date
                      ? 'bg-purple-600 text-white dark:text-text-dark'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {new Date(data.date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}日
                </button>
              ))}
            </div>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="absolute right-0 top-0 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  <CalendarRange className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="flex items-center justify-center">
                <div className="w-full max-w-sm dark:text-text-dark">
                  <SheetHeader>
                    <SheetTitle>选择日期范围</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      // onSelect={handleRangeSelect}
                      onDayClick={handleDayClick}
                      numberOfMonths={1}
                      defaultMonth={dateRange?.from}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* 统计卡片 */}
          {selectedData && (
            <div className="grid grid-cols-3 gap-4 dark:text-text-dark">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">新记住</span>
                </div>
                <div className="text-2xl font-bold">{selectedData.newWords}</div>
                <div className="text-xs text-gray-500">个单词</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">已复习</span>
                </div>
                <div className="text-2xl font-bold">{selectedData.reviewedWords}</div>
                <div className="text-xs text-gray-500">个单词</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">已掌握</span>
                </div>
                <div className="text-2xl font-bold">{selectedData.masteredWords}</div>
                <div className="text-xs text-gray-500">个单词</div>
              </div>
            </div>
          )}

          {/* 难背单词列表 */}
          {selectedData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-medium mb-3">特别难背的单词</h2>
              <div className="grid grid-cols-1 gap-4">
                {selectedData.difficultWords.map((word, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{word}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {word === "ephemeral" && "短暂的，瞬息的；（植物）朝生暮死的"}
                        {word === "ubiquitous" && "普遍存在的，无所不在的"}
                        {word === "paradigm" && "范例，典范；思维方式"}
                        {word === "serendipity" && "意外发现，机缘巧合"}
                        {word === "eloquent" && "雄辩的，有说服力的；善于表达的"}
                        {word === "pragmatic" && "务实的，实用的"}
                        {word === "esoteric" && "深奥的，难懂的；只有内行才懂的"}
                        {word === "quintessential" && "典型的，精髓的；最典型的例子"}
                        {word === "juxtapose" && "并置，并列"}
                        {word === "ambiguous" && "模棱两可的，不明确的"}
                        {word === "cognizant" && "认知的，意识到的"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}