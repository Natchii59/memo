'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  toast
} from '@/components/ui'

import { TextareaAutosize } from '../ui/textarea'
import { createMemo } from './actions'

const createMemoFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Le titre doit contenir au moins 3 caractères.'
    })
    .max(50, {
      message: 'Le titre doit contenir au maximum 50 caractères.'
    }),
  content: z.string().min(1, {
    message: 'Le contenu doit contenir au moins 1 caractère.'
  })
})

export type CreateMemoFormValues = z.infer<typeof createMemoFormSchema>

export function CreateMemoForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<CreateMemoFormValues>({
    resolver: zodResolver(createMemoFormSchema),
    defaultValues: {
      title: '',
      content: ''
    },
    mode: 'onChange'
  })

  async function onSubmit(data: CreateMemoFormValues) {
    setIsLoading(true)

    const result = await createMemo(data)

    setIsLoading(false)

    if (!result.ok) {
      if (result.errorField || result.errorMessage) {
        return form.setError(result.errorField ?? 'root', {
          message: result.errorMessage ?? "Quelque chose s'est mal passé."
        })
      } else {
        return toast({
          title: "Quelque chose s'est mal passé",
          description: "Le mémo n'a pas pu être créé. Veuillez réessayer.",
          variant: 'destructive'
        })
      }
    }

    toast({
      title: 'Mémo créé',
      description: 'Le mémo a été créé avec succès.'
    })

    router.push(`/memo/${result.memo?.id}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='Titre' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextareaAutosize
                  placeholder='Le contenu de votre mémo...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>
          {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
          <span>Créer votre mémo</span>
        </Button>
      </form>
    </Form>
  )
}
