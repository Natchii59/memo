'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Memo } from '@prisma/client'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { Button, buttonVariants } from '../ui'
import { deleteMemo } from './actions'

interface MemoContainerPageProps {
  memo: Memo
}

export function MemoContainerPage({ memo }: MemoContainerPageProps) {
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteMemo(memo.id)

    setIsDeleting(false)

    router.replace('/')
  }

  return (
    <div className='grid gap-4'>
      <div className='flex min-w-0 flex-col items-center gap-4 sm:flex-row'>
        <div className='w-full min-w-0 flex-auto self-start break-words'>
          <h1 className='font-heading text-2xl sm:text-3xl'>{memo.title}</h1>
          <p className='flex items-center gap-1 text-sm text-muted-foreground'>
            <Icons.calendar className='h-4 w-4' />
            <span>
              Mis à jour le{' '}
              {new Date(memo.updatedAt).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </span>
          </p>
        </div>

        <div className='grid w-full grid-cols-2 gap-2 sm:w-auto sm:shrink-0'>
          <Link
            href={`/memo/${memo.id}/edit`}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Modifier
          </Link>
          <Button
            variant='destructive'
            onClick={handleDelete}
            className='gap-2'
          >
            {isDeleting && <Icons.spinner className='h-4 w-4 animate-spin' />}
            Supprimer
          </Button>
        </div>
      </div>

      <p className='w-full min-w-0 whitespace-pre-line break-words'>
        {memo.content}
      </p>
    </div>
  )
}
