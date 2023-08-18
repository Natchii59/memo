'use client'

import { useSearchParams } from 'next/navigation'

import { AuthDefaultError, AuthEmailError } from '@/components/auth/errors'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  switch (error) {
    case 'Verification':
      return <AuthEmailError />
    default:
      return <AuthDefaultError />
  }
}
