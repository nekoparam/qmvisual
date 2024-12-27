'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkTokenValidity } from '@/lib/auth'

// 类型定义
interface PortalState {
  isLoading: boolean
  error: string | null
}

// 环境变量配置
const JUPYTER_HUB_URL = process.env.NEXT_PUBLIC_JUPYTER_HUB_URL || 'http://localhost:8889'
const AUTH_TOKEN_KEY = '@qmauth/token'

export default function ResearchPortal() {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [state, setState] = useState<PortalState>({
    isLoading: true,
    error: null
  })

  useEffect(() => {
    initializePortal()
  }, [])

  const initializePortal = async () => {
    try {
      if (!checkTokenValidity()) {
        router.push('/auth/sign-in')
        return
      }

      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      if (!token) {
        throw new Error('认证令牌不存在')
      }

      const jupyterHubUrl = `${JUPYTER_HUB_URL}/hub/login?access_token=${token}`

      if (iframeRef.current) {
        iframeRef.current.src = jupyterHubUrl
      }

      setState(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '加载门户时发生错误'
      }))
    }
  }

  if (state.error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-red-500">{state.error}</div>
      </div>
    )
  }

  if (state.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <iframe
        ref={iframeRef}
        className="h-full w-full border-none"
        title="JupyterHub"
        sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-popups"
      />
    </div>
  )
} 