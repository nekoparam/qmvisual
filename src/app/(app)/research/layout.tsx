import { redirect } from 'next/navigation'

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 检查当前路径是否为 /research，如果是则重定向到 /research/portal
  if (typeof window !== 'undefined' && window.location.pathname === '/research') {
    redirect('/research/portal')
  }

  return <>{children}</>
} 