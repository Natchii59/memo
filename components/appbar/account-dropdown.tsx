import {
  buttonVariants,
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui'
import { UserAvatar } from '@/components/user-avatar'
import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'

import { AccountDropdownContent } from './account-dropdown-content'

export async function AccountDropdown() {
  const currentUser = await getCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ size: 'icon', variant: 'secondary' }))}
      >
        <UserAvatar user={currentUser} />
      </DropdownMenuTrigger>

      <AccountDropdownContent user={currentUser} />
    </DropdownMenu>
  )
}
