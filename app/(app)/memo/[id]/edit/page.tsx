import { notFound } from 'next/navigation'

import { EditMemoForm } from '@/components/memo/edit-form'
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

interface EditMemoPageProps {
  params: {
    id: string
  }
}

export default async function EditMemoPage({ params }: EditMemoPageProps) {
  const memo = await getMemo(params.id)

  return <EditMemoForm memo={memo} />
}
