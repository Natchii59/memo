import { Separator } from '@/components/ui'

import { AppearanceForm } from './appearance-form'

export default async function AppearanceSettingsPage() {
  return (
    <div className='space-y-4'>
      <p className='text-center text-sm text-muted-foreground'>
        Mettez à jour vos préférences d&apos;apparence.
      </p>

      <Separator />
      <AppearanceForm />
    </div>
  )
}
