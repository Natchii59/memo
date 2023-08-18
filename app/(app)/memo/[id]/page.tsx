import { notFound } from 'next/navigation'

import { MemoContainerPage } from '@/components/memo/memo-page'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

async function getMemo(id: string) {
  const currentUser = await getCurrentUser()

  const memo = await db.memo.findUnique({
    where: {
      id,
      userId: currentUser.id
    }
  })

  if (!memo) notFound()

  return memo
}

interface MemoPageProps {
  params: {
    id: string
  }
}

export default async function MemoPage({ params }: MemoPageProps) {
  const memo = await getMemo(params.id)

  return <MemoContainerPage memo={memo} />
}
