'use client'

import { useState } from 'react'
import type { User } from '@prisma/client'

import { Icons } from '@/components/icons'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarImageLoadingStatus,
  AvatarProps,
  Skeleton
} from '@/components/ui'
import { cn } from '@/lib/utils'

interface UserAvatarProps extends AvatarProps {
  classNameImage?: string
  classNameFallback?: string
  classNameIcon?: string
  user: Pick<User, 'name' | 'image'>
}

export function UserAvatar({
  user,
  className,
  classNameImage,
  classNameFallback,
  classNameIcon,
  ...props
}: UserAvatarProps) {
  const [avatarStatus, setAvatarStatus] = useState<AvatarImageLoadingStatus>()

  return (
    <Avatar className={cn('rounded-md', className)} {...props}>
      {user.image ? (
        <>
          <AvatarImage
            alt='Picture'
            src={user.image ?? ''}
            className={cn(classNameImage)}
            onLoadingStatusChange={setAvatarStatus}
          />
          {(!avatarStatus || avatarStatus === 'loading') && (
            <Skeleton className='h-full w-full' />
          )}

          <AvatarFallback
            className={cn('rounded-md', classNameFallback)}
            delayMs={2000}
          >
            <span className='sr-only'>{user.name}</span>
            <Icons.user className={cn('h-4 w-4', classNameIcon)} />
          </AvatarFallback>
        </>
      ) : (
        <AvatarFallback className={cn('rounded-md', classNameFallback)}>
          <span className='sr-only'>{user.name}</span>
          <Icons.user className={cn('h-4 w-4', classNameIcon)} />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
