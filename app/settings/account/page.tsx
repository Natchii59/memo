import { Separator } from '@/components/ui'
import { getCurrentUser } from '@/lib/session'

import { AccountForm } from './account-form'

export default async function AccountSettingsPage() {
  const user = await getCurrentUser()

  return (
    <div className='space-y-4'>
      <p className='text-center text-sm text-muted-foreground'>
        Mettez à jour vos informations personnelles.
      </p>

      <Separator />
      <AccountForm user={user} />
    </div>
  )
}
