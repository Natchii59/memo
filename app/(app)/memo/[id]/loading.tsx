import { Skeleton } from '@/components/ui'

export default function MemoLoading() {
  return (
    <div className='grid gap-4'>
      <div className='flex items-center gap-2'>
        <div className='flex-auto'>
          <Skeleton className='h-9 w-1/4' />
        </div>

        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
      </div>

      <div className='grid gap-2'>
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-1/3' />
      </div>
    </div>
  )
}
