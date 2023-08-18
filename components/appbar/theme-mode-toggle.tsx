'use client'

import { useTheme } from 'next-themes'

import { Icons } from '@/components/icons'
import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui'

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {theme === 'dark' ? (
          <Icons.moon className='mr-2 h-4 w-4' />
        ) : theme === 'light' ? (
          <Icons.sun className='mr-2 h-4 w-4' />
        ) : (
          <Icons.laptop className='mr-2 h-4 w-4' />
        )}
        <span>Thème</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value='light'>
              <Icons.sun className='mr-2 h-4 w-4' />
              <span>Clair</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='dark'>
              <Icons.moon className='mr-2 h-4 w-4' />
              <span>Sombre</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='system'>
              <Icons.laptop className='mr-2 h-4 w-4' />
              <span>Système</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
