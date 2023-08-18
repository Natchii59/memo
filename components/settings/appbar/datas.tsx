import { Icons, IconType } from '../../icons'

export interface SettingsLink {
  title: string
  description: string
  href: string
  icon: IconType
}

export const settingsLinks: SettingsLink[] = [
  {
    title: 'Compte',
    description: 'Modifiez vos paramètres de compte',
    href: '/settings/account',
    icon: Icons.user
  },
  {
    title: 'Apparence',
    description: "Modifiez vos paramètres d'apparence",
    href: '/settings/appearance',
    icon: Icons.paintbrush
  }
]
