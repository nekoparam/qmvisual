import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn2() {
  return (
    <>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>用户登录</h1>
              <p className='text-sm text-muted-foreground'>
                在下方输入您的邮箱和密码<br />
              </p>
            </div>
            <UserAuthForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              我们默认您在点击登录按钮的时候, 已经同意了{' '}
              <a
                href='/legal/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                服务条款
              </a>{' '}
              和{' '}
              <a
                href='/legel/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                隐私政策
              </a>
              .
            </p>
    </>
  )
}