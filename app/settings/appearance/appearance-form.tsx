'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
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
  RadioGroup,
  RadioGroupItem,
  toast
} from '@/components/ui'
import { useMounted } from '@/hooks/use-mounted'

import AppearanceSettingsLoading from './loading'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.'
  })
})

export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
  const mounted = useMounted()
  const { theme, setTheme, systemTheme } = useTheme()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: theme as AppearanceFormValues['theme']
    },
    mode: 'onChange'
  })

  async function onSubmit(data: AppearanceFormValues) {
    setIsLoading(true)

    setTheme(data.theme)

    setIsLoading(false)

    toast({
      title: 'Apparence mise à jour',
      description: 'Vos préférences d’apparence ont été mises à jour.'
    })
  }

  if (!mounted) return <AppearanceSettingsLoading />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Thème</FormLabel>
              <FormDescription>Sélectionnez un thème.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='grid max-w-full grid-cols-2 gap-6 pt-2 sm:grid-cols-3'
              >
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='light' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent hover:bg-accent'>
                      <div className='space-y-2 rounded-sm bg-zinc-100 p-2'>
                        <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
                          <div className='h-2 w-[80px] rounded-lg bg-zinc-200' />
                          <div className='h-2 w-[100px] rounded-lg bg-zinc-200' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-zinc-200' />
                          <div className='h-2 w-[100px] rounded-lg bg-zinc-200' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-zinc-200' />
                          <div className='h-2 w-[100px] rounded-lg bg-zinc-200' />
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center font-normal'>
                      Clair
                    </span>
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='dark' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
                      <div className='space-y-2 rounded-sm bg-zinc-950 p-2'>
                        <div className='space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
                          <div className='h-2 w-[80px] rounded-lg bg-zinc-400' />
                          <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-zinc-400' />
                          <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-zinc-400' />
                          <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center font-normal'>
                      Sombre
                    </span>
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='system' className='sr-only' />
                    </FormControl>
                    {systemTheme === 'light' ? (
                      <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent hover:bg-accent'>
                        <div className='space-y-2 rounded-sm bg-zinc-100 p-2'>
                          <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
                            <div className='h-2 w-[80px] rounded-lg bg-zinc-200' />
                            <div className='h-2 w-[100px] rounded-lg bg-zinc-200' />
                          </div>
                          <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                            <div className='h-4 w-4 rounded-full bg-zinc-200' />
                            <div className='h-2 w-[100px] rounded-lg bg-zinc-200' />
                          </div>
                          <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                            <div className='h-4 w-4 rounded-full bg-zinc-200' />
                            <div className='h-2 w-[100px] rounded-lg bg-zinc-200' />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent'>
                        <div className='space-y-2 rounded-sm bg-zinc-950 p-2'>
                          <div className='space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
                            <div className='h-2 w-[80px] rounded-lg bg-zinc-400' />
                            <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
                          </div>
                          <div className='flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
                            <div className='h-4 w-4 rounded-full bg-zinc-400' />
                            <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
                          </div>
                          <div className='flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm'>
                            <div className='h-4 w-4 rounded-full bg-zinc-400' />
                            <div className='h-2 w-[100px] rounded-lg bg-zinc-400' />
                          </div>
                        </div>
                      </div>
                    )}
                    <span className='block w-full p-2 text-center font-normal'>
                      Système
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
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
