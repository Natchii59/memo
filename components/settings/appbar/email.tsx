import { getCurrentUser } from '@/lib/session'

export async function SettingsEmailAppbar() {
  const user = await getCurrentUser()

  return (
    <p className='max-w-[300px] truncate text-muted-foreground'>
      {user.name ?? user.email}
    </p>
  )
}
