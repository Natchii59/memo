import { redirect } from 'next/navigation'
import { env } from '@/env'
import { getServerSession } from 'next-auth'

import { AuthForm } from '@/components/auth/auth-form'

export default async function SignInPage() {
  const session = await getServerSession()

  if (session) redirect('/')

  return (
    <div className='flex flex-col justify-center gap-y-6 sm:w-[600px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Bienvenue</h1>
        <p className='text-sm text-muted-foreground'>
          Entrez votre adresse email pour vous connecter
        </p>
      </div>

      <AuthForm isPreviewMode={env.VERCEL_ENV === 'preview'} />
    </div>
  )
}
