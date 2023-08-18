import { settingsLinks } from '@/components/settings/appbar/datas'
import { SettingsLink } from '@/components/settings/settings-link'

export default function SettingsPage() {
  return (
    <div className='flex flex-col gap-2'>
      {settingsLinks.map((link, index) => (
        <SettingsLink key={index} link={link} />
      ))}
    </div>
  )
}
