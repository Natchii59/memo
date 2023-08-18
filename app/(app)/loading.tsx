import { Skeleton } from '@/components/ui'

export default function MemoLoading() {
  return (
    <div className='grid gap-2'>
      <Skeleton className='h-9 w-1/2' />

      <Skeleton className='h-6 w-1/3' />

      <div className='flex items-center gap-2'>
        <Skeleton className='h-10 flex-auto' />

        <Skeleton className='h-10 w-10' />
      </div>

      <div className='grid gap-2 md:grid-cols-2'>
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton key={i} className='h-[226px] w-full' />
        ))}
      </div>
    </div>
  )
}
