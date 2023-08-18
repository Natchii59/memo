'use client'

import Link from 'next/link'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <Icons.xCircle className='h-28 w-28' />
      <h1 className='text-4xl font-semibold tracking-tight'>404</h1>
      <p className='text-sm text-muted-foreground'>
        Cette page est introuvable
      </p>
      <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
