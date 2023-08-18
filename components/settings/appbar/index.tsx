import { Suspense } from 'react'

import { SettingsAppbarBackLink, SettingsAppbarTitle } from './client'
import { SettingsEmailAppbar } from './email'
import { SettingsEmailAppbarLoading } from './loading'

export function SettingsAppbar() {
  return (
    <nav className='fixed left-0 top-0 z-50 w-full'>
      <div className='container relative bg-background py-2'>
        <div className='relative flex flex-col items-center gap-1'>
          <SettingsAppbarTitle />

          <Suspense fallback={<SettingsEmailAppbarLoading />}>
            <SettingsEmailAppbar />
          </Suspense>

          <SettingsAppbarBackLink />
        </div>
      </div>
    </nav>
  )
}
