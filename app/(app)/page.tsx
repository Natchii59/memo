import { unstable_cache } from 'next/cache'

import { MemosPagination } from '@/components/memo/pagination'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export default async function Home() {
  const currentUser = await getCurrentUser()

  const memos = await unstable_cache(
    async (userId: string) => {
      const memos = await db.memo.findMany({
        where: {
          userId
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })

      return memos
    },
    ['memos-user'],
    {
      tags: ['memos-user'],
      revalidate: 10
    }
  )(currentUser.id)

  return (
    <div className='grid gap-2'>
      <h1 className='font-heading text-3xl'>
        {currentUser.name ? `Bonjour ${currentUser.name}` : `Bonjour`},
      </h1>

      <p className='font-medium'>
        Vous avez {memos.length} {memos.length > 1 ? 'mémos' : 'mémo'}{' '}
        enregistré{memos.length > 1 ? 's' : ''}.
      </p>

      <MemosPagination baseMemos={memos} />
    </div>
  )
}
