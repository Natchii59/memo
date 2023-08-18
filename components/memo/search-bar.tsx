'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Memo } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  toast
} from '@/components/ui'

import { searchMemos } from './actions'

const memoSearchBarFormSchema = z.object({
  title: z.string().optional()
})

export type MemoSearchBarFormValues = z.infer<typeof memoSearchBarFormSchema>

interface MemoSearchBarProps {
  setMemos: Dispatch<SetStateAction<Memo[]>>
}

export function MemoSearchBar({ setMemos }: MemoSearchBarProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  const form = useForm<MemoSearchBarFormValues>({
    resolver: zodResolver(memoSearchBarFormSchema),
    defaultValues: {
      title: ''
    },
    mode: 'onChange'
  })

  async function onSubmit(data: MemoSearchBarFormValues) {
    if (!hasChanged) return

    setIsLoading(true)

    const result = await searchMemos(data)

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

    if (result.memos) {
      setMemos(result.memos)
      setHasChanged(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full items-center gap-2'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex-auto'>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Rechercher via le titre'
                  onInput={() => setHasChanged(true)}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' size='icon' disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className='h-4 w-4 animate-spin' />
          ) : (
            <Icons.search className='h-4 w-4' />
          )}
        </Button>
      </form>
    </Form>
  )
}
