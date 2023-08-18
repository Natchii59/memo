'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast
} from '@/components/ui'

import { updateAccount } from './actions'

const accountFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  name: z.string().min(3, {
    message: 'Please enter a valid name.'
  })
})

export type AccountFormValues = z.infer<typeof accountFormSchema>

interface AccountFormProps {
  user: Pick<User, 'id' | 'email' | 'name'>
}

export function AccountForm({ user }: AccountFormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: user.email ?? '',
      name: user.name ?? ''
    },
    mode: 'onChange'
  })

  async function onSubmit(data: AccountFormValues) {
    setIsLoading(true)

    const result = await updateAccount(user.id, data)

    setIsLoading(false)

    if (!result.ok) {
      if (result.errorField || result.errorMessage) {
        return form.setError(result.errorField ?? 'root', {
          message: result.errorMessage ?? "Quelque chose s'est mal passé."
        })
      } else {
        return toast({
          title: "Quelque chose s'est mal passé",
          description:
            "Votre compte n'a pas pu être mis à jour. Veuillez réessayer.",
          variant: 'destructive'
        })
      }
    }

    toast({
      title: 'Compte mis à jour',
      description: 'Votre compte a été mis à jour avec succès.'
    })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='nom@exemple.com' {...field} />
              </FormControl>
              <FormDescription>
                Cet e-mail est celui que vous utilisez pour vous connecter à
                votre compte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Votre nom' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>
          {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
          <span>Mettre à jour</span>
        </Button>
      </form>
    </Form>
  )
}
