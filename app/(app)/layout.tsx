import { Appbar } from '@/components/appbar'

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='container relative'>
      <Appbar />

      <main className='pb-14 pt-[4.75rem]'>{children}</main>
    </div>
  )
}
