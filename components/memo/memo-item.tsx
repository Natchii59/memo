'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Memo } from '@prisma/client'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui'
import { deleteMemo } from './actions'

interface MemoItemProps {
  memo: Memo
}

export function MemoItem({ memo }: MemoItemProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteMemo(memo.id)

    setIsDeleting(false)
  }

  return (
    <Card className='flex w-full min-w-0 flex-col break-words'>
      <CardHeader className='p-4 pb-0'>
        <CardTitle className='truncate leading-snug'>{memo.title}</CardTitle>
      </CardHeader>

      <CardContent className='line-clamp-4 flex-auto whitespace-pre-line break-words p-4 pb-0'>
        {memo.content}
      </CardContent>

      <CardFooter className='grid gap-2 p-4'>
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
        <div className='grid gap-2 md:grid-cols-3'>
          <Link href={`/memo/${memo.id}`} className={cn(buttonVariants())}>
            Voir
          </Link>
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
      </CardFooter>
    </Card>
  )
}
