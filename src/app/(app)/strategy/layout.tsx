import { redirect } from 'next/navigation'

export default function StrategyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 检查当前路径是否为 /strategy，如果是则重定向到 /strategy/list
  if (typeof window !== 'undefined' && window.location.pathname === '/strategy') {
    redirect('/strategy/list')
  }

  return <>{children}</>
} 