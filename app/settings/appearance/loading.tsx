import { Skeleton } from '@/components/ui'

function ItemLoading() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-4 w-24' />
      <Skeleton className='h-10' />
    </div>
  )
}

export default function AppearanceSettingsLoading() {
  return (
    <div className='space-y-6'>
      {Array.from({ length: 5 }).map((_, i) => (
        <ItemLoading key={i} />
      ))}
    </div>
  )
}
