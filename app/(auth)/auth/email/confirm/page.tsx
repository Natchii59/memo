import Link from 'next/link'

import { Icons } from '@/components/icons'
import { getCurrentUser } from '@/lib/session'

export default async function EmailConfirmPage() {
  await getCurrentUser()

  return (
    <div className='container flex flex-col items-center justify-center gap-y-4 text-center'>
      <Icons.checkCircle className='h-16 w-16' />

      <h1 className='font-heading text-3xl sm:text-4xl'>
        Vous êtes maintenant connecté
      </h1>
      <h2 className='text-2xl font-medium tracking-tight'>
        Retournez sur l&apos;onglet d&apos;origine.
      </h2>

      <p>
        Vous pouvez fermer cette fenêtre ou cliquer sur ce{' '}
        <Link
          href='/'
          className='font-semibold underline-offset-2 hover:underline'
        >
          lien
        </Link>{' '}
        pour revenir à la page d&apos;accueil.
      </p>
    </div>
  )
}
