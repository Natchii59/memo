'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast
} from '@/components/ui'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { getSessionAuth } from './actions'

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address'
    })
    .toLowerCase()
})

interface AuthFormProps {
  isPreviewMode?: boolean
}

export function AuthForm({ isPreviewMode }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  const [emailSending, setEmailSending] = useState<boolean>(false)
  const [successToast, setSuccessToast] = useState<ReturnType<
    typeof toast
  > | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEmailLoading(true)

    const signInResult = await signIn('email', {
      email: values.email,
      redirect: false,
      callbackUrl: '/auth/email/confirm'
    })

    setIsEmailLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Quelque chose s'est mal passé",
        description: 'Votre demande de connexion a échoué. Veuillez réessayer.',
        variant: 'destructive'
      })
    }

    setEmailSending(true)

    setSuccessToast(
      toast({
        title: 'Vérifiez vos emails',
        description:
          "Nous vous avons envoyé un lien magique pour vous connecter. N'oubliez pas de vérifier vos spams."
      })
    )
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (emailSending) {
      interval = setInterval(async () => {
        const session = await getSessionAuth()

        if (session) {
          router.push(searchParams.get('callbackUrl') ?? '/')
          setEmailSending(false)
          if (successToast) {
            successToast.update({
              id: successToast.id,
              title: 'Vous êtes maintenant connecté',
              description: 'Bienvenue !'
            })
          }
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [emailSending, router, searchParams, successToast])

  return (
    <div className='grid gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='sr-only'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='nom@exemple.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>
            {isEmailLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Se connecter par email
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Ou connectez-vous avec
          </span>
        </div>
      </div>

      <div className={cn(isPreviewMode && 'relative')}>
        <Button
          variant='outline'
          onClick={() => {
            if (isPreviewMode) return
            setIsGoogleLoading(true)
            signIn('google', {
              callbackUrl: searchParams.get('callbackUrl') ?? '/'
            })
          }}
          disabled={isPreviewMode || isGoogleLoading}
          className='w-full'
        >
          {isGoogleLoading ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Icons.google className='mr-2 h-4 w-4' />
          )}{' '}
          Google
        </Button>

        {isPreviewMode && (
          <div className='absolute inset-0 flex cursor-not-allowed items-center justify-center rounded-md border bg-muted/90'>
            <span className='text-center text-xs font-medium leading-tight sm:text-base'>
              L&apos;authentification Google n&apos;est pas disponible en mode
              aperçu
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
