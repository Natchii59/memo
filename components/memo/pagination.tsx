'use client'

import { useState } from 'react'
import { Memo } from '@prisma/client'

import { Icons } from '../icons'
import { MemoItem } from './memo-item'
import { MemoSearchBar } from './search-bar'

interface MemosPaginationProps {
  baseMemos: Memo[]
}

export function MemosPagination({ baseMemos }: MemosPaginationProps) {
  const [memos, setMemos] = useState<Memo[]>(baseMemos)

  return (
    <>
      <MemoSearchBar setMemos={setMemos} />

      {memos.length > 0 ? (
        <div className='grid gap-2 md:grid-cols-2'>
          {memos.map(memo => (
            <MemoItem key={memo.id} memo={memo} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-2 pt-4'>
          <Icons.ghost className='h-14 w-14' />
          <p className='font-medium'>Aucun résultat...</p>
        </div>
      )}
    </>
  )
}
