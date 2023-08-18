import Link from 'next/link'

import { Icons } from '../icons'

export function AuthDefaultError() {
  return (
    <div className='container flex flex-col items-center justify-center gap-y-4 text-center'>
      <Icons.xCircle className='h-16 w-16' />

      <h1 className='font-heading text-3xl sm:text-4xl'>
        Quelque chose s&apos;est mal passé.
      </h1>
      <h2 className='text-2xl font-medium tracking-tight'>
        Veuillez réessayer plus tard.
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

export function AuthEmailError() {
  return (
    <div className='container flex flex-col items-center justify-center gap-y-4 text-center'>
      <Icons.xCircle className='h-16 w-16' />

      <h1 className='font-heading text-3xl sm:text-4xl'>
        Ce lien est invalide.
      </h1>
      <h2 className='text-2xl font-medium tracking-tight'>
        Il a peut-être déjà été utilisé ou a expiré.
      </h2>

      <p>
        Vous pouvez renvoyer un lien magique dans votre boîte mail dans la{' '}
        <Link
          href='/sign-in'
          className='font-semibold underline-offset-2 hover:underline'
        >
          page de connexion
        </Link>
        .
      </p>
    </div>
  )
}
