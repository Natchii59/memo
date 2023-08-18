'use server'

import { revalidateTag } from 'next/cache'
import { Memo } from '@prisma/client'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

import { CreateMemoFormValues } from './create-form'
import { EditMemoFormValues } from './edit-form'
import { MemoSearchBarFormValues } from './search-bar'

interface CreateMemoResult {
  ok: boolean
  memo?: Memo
  errorField?: 'title' | 'content' | 'root'
  errorMessage?: string
}

export async function createMemo(
  memo: CreateMemoFormValues
): Promise<CreateMemoResult> {
  try {
    const user = await getCurrentUser()

    const result = await db.memo.create({
      data: {
        title: memo.title,
        content: memo.content,
        userId: user.id
      }
    })

    revalidateTag('memos-user')

    return { ok: true, memo: result }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

interface DeleteMemoResult {
  ok: boolean
}

export async function deleteMemo(memoId: string): Promise<DeleteMemoResult> {
  try {
    const user = await getCurrentUser()

    await db.memo.delete({
      where: {
        id: memoId,
        userId: user.id
      }
    })

    revalidateTag('memos-user')

    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

interface UpdateMemoResult {
  ok: boolean
  memo?: Memo
  errorField?: 'title' | 'content' | 'root'
  errorMessage?: string
}

export async function updateMemo(
  memo: EditMemoFormValues,
  memoId: string
): Promise<UpdateMemoResult> {
  try {
    const user = await getCurrentUser()

    const result = await db.memo.update({
      where: {
        id: memoId,
        userId: user.id
      },
      data: {
        title: memo.title,
        content: memo.content
      }
    })

    revalidateTag('memos-user')

    return { ok: true, memo: result }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

interface SearchMemosResult {
  ok: boolean
  memos?: Memo[]
  errorField?: 'title' | 'root'
  errorMessage?: string
}

export async function searchMemos(
  data: MemoSearchBarFormValues
): Promise<SearchMemosResult> {
  try {
    const user = await getCurrentUser()

    const result = await db.memo.findMany({
      where: {
        title: {
          contains: data.title,
          mode: 'insensitive'
        },
        userId: user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return { ok: true, memos: result }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}
