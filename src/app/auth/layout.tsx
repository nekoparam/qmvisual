import type { Metadata } from 'next';
import { Card } from '@/components/ui/card'
import { UserAuthForm } from '@/app/auth/sign-in/components/user-auth-form'


export const metadata: Metadata = {
    title: 'CAOWORD.me 用户登录',
    description: '草窝单词用户登录'
  };


export default function AuthLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    // Persisting the sidebar state in the cookie.
    return (
        <>
        <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
            <div className='mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-6 w-6'
              >
                {/* <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' /> */}
                <rect x="1" y="1" width="22" height="22" rx="2" />
    <text x="5" y="15" fontFamily="Arial" fontSize="10" fill="currentColor" stroke="none">Ab</text>
    
              </svg>
  
  
              <h1 className='text-xl font-medium'>CAOWORD.me</h1>
            </div>
            <Card className='p-6'>
            {children}
            </Card>
          </div>
        </div>
      </>
    );
  }