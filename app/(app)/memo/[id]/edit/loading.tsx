import { Skeleton } from '@/components/ui'

export default function MemoLoading() {
  return (
    <div className='grid gap-4'>
      <Skeleton className='h-10 w-full' />

      <Skeleton className='h-20 w-full' />

      <Skeleton className='h-10 w-[200px]' />
    </div>
  )
}
