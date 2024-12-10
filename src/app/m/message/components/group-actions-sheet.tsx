'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

const wordBooks = [
  { id: '1', name: '四级核心词汇' },
  { id: '2', name: '六级核心词汇' },
  { id: '3', name: '考研必备词汇' },
]

export function GroupActionsSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<'menu' | 'create' | 'join'>('menu')
  const [groupPassword, setGroupPassword] = useState('')
  
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const groupName = formData.get('groupName')
    const wordBook = formData.get('wordBook')
    
    // Generate a random group password (in real app, this would come from the backend)
    const generatedPassword = Math.random().toString(36).substring(2, 10).toUpperCase()
    setGroupPassword(generatedPassword)
  }

  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const password = formData.get('password')
    // Handle joining group with password
    console.log('Joining group with password:', password)
    setIsOpen(false)
  }

  const renderContent = () => {
    switch (view) {
      case 'menu':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4 pt-4"
          >
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => setView('create')}
            >
              建立群组
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => setView('join')}
            >
              加入群组
            </Button>
          </motion.div>
        )

      case 'create':
        return (
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4 pt-4"
            onSubmit={handleCreateGroup}
          >
            <div className="space-y-2">
              <Label htmlFor="groupName">群组名称</Label>
              <Input id="groupName" name="groupName" placeholder="请输入群组名称" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wordBook">选择单词书</Label>
              <Select name="wordBook" required>
                <SelectTrigger>
                  <SelectValue placeholder="选择单词书" />
                </SelectTrigger>
                <SelectContent>
                  {wordBooks.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {groupPassword ? (
              <div className="space-y-2 p-4 border rounded-lg bg-muted">
                <Label>群组密码</Label>
                <p className="text-2xl font-mono text-center">{groupPassword}</p>
                <p className="text-sm text-muted-foreground text-center">
                  请保存此密码并分享给想要加入群组的成员
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full">
                创建群组
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setView('menu')
                setGroupPassword('')
              }}
            >
              返回
            </Button>
          </motion.form>
        )

      case 'join':
        return (
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4 pt-4"
            onSubmit={handleJoinGroup}
          >
            <div className="space-y-2">
              <Label htmlFor="password">群组密码</Label>
              <Input
                id="password"
                name="password"
                placeholder="请输入群组密码"
                required
                className="font-mono"
              />
            </div>
            <Button type="submit" className="w-full">
              加入群组
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setView('menu')}
            >
              返回
            </Button>
          </motion.form>
        )
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] h-auto">
        <SheetHeader>
          <SheetTitle>
            {view === 'menu' && '群组操作'}
            {view === 'create' && '建立群组'}
            {view === 'join' && '加入群组'}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 pt-4 pb-8">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  )
}

