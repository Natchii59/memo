'use client'

import Link from 'next/link'

import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <Icons.xCircle className='h-28 w-28' />
      <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
        Mémo introuvable
      </h1>
      <p className='text-sm text-muted-foreground'>
        Ce mémo n&apos;existe pas ou a été supprimé
      </p>
      <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
