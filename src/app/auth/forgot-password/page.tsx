import { ForgotForm } from './components/forgot-form'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <>
     
        <div className='mb-2 flex flex-col space-y-2 text-left'>
            <h1 className='text-md font-semibold tracking-tight'>
            忘记密码
            </h1>
            <p className='text-sm text-muted-foreground'>
            输入您的邮箱 <br /> 我们将会发送一封重置密码的邮件给您.
            </p>
        </div>
        <ForgotForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
            还没有账号?{' '}
            <Link
            href='/auth/sign-up'
            className='underline underline-offset-4 hover:text-primary'
            >
            注册
            </Link>
            .
        </p>

    </>
  )
}
