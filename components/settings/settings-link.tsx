import Link from 'next/link'

import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import type { SettingsLink as SettingsLinkType } from './appbar/datas'

interface SettingsLinkProps {
  link: SettingsLinkType
}

export function SettingsLink({ link }: SettingsLinkProps) {
  return (
    <Link
      href={link.href}
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'flex h-auto items-center justify-start gap-2 p-3 font-normal'
      )}
    >
      <link.icon className='h-5 w-5' />

      <div className='flex-auto'>
        <h3 className='text-base font-semibold leading-tight'>{link.title}</h3>
        <p className='text-sm leading-tight text-muted-foreground'>
          {link.description}
        </p>
      </div>

      <Icons.chevronRight className='h-5 w-5 text-muted-foreground' />
    </Link>
  )
}
