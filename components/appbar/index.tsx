import { Suspense } from 'react'
import Link from 'next/link'

import { buttonVariants, Card } from '@/components/ui'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { AccountDropdown } from './account-dropdown'
import { AccountDropdownLoading } from './loading'

export function Appbar() {
  return (
    <nav className='fixed left-0 top-0 z-50 w-full'>
      <div className='container relative pt-1'>
        <div className='absolute left-0 top-0 -z-10 h-[calc(100%-0.5rem)] w-full bg-background' />

        <Card className='flex items-center gap-2 rounded-md p-2'>
          <Link href='/' className='font-heading text-2xl leading-none'>
            Memo
          </Link>

          <div className='flex flex-auto justify-end'>
            <Link href='/memo/create' className={cn(buttonVariants(), 'gap-2')}>
              <Icons.plus className='h-4 w-4' />
              <span>
                Créer <span className='hidden sm:inline'>un mémo</span>
              </span>
            </Link>
          </div>

          <Suspense fallback={<AccountDropdownLoading />}>
            <AccountDropdown />
          </Suspense>
        </Card>
      </div>
    </nav>
  )
}
