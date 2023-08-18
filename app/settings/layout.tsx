import { SettingsAppbar } from '@/components/settings/appbar'

export default function SettingsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='container relative'>
      <SettingsAppbar />

      <main className='pt-20'>{children}</main>
    </div>
  )
}
