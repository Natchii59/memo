'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

import { Icons } from '@/components/icons'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui'
import { cn } from '@/lib/utils'

import { ThemeModeToggle } from './theme-mode-toggle'

interface AccountDropdownContentProps {
  user: Pick<User, 'name' | 'email'>
}

export function AccountDropdownContent({ user }: AccountDropdownContentProps) {
  const [isSignOutLoading, setIsSignOutLoading] = useState<boolean>(false)

  return (
    <DropdownMenuContent align='end' side='bottom'>
      <DropdownMenuItem asChild>
        <div
          className={cn(
            'pointer-events-none flex min-w-[170px] max-w-[200px] flex-col !items-start justify-center gap-1 leading-tight'
          )}
        >
          <p className='w-full truncate font-medium'>
            {user.name ?? user.email}
          </p>
          {user.name && (
            <p className='w-full truncate text-muted-foreground'>
              {user.email}
            </p>
          )}
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <ThemeModeToggle />
      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <Link href='/settings'>
          <Icons.settings className='mr-2 h-4 w-4' />
          <span>Paramètres</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={e => {
          e.preventDefault()
          setIsSignOutLoading(true)
          signOut({ callbackUrl: '/sign-in' })
        }}
        className='text-red-500 focus:text-red-500'
      >
        {isSignOutLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Icons.logout className='mr-2 h-4 w-4' />
        )}
        <span>Se déconnecter</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
