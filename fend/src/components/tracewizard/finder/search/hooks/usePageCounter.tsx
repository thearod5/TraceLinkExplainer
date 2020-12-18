import { useContext, useState } from 'react'
import { AppContext } from '../../../../../App'
import { VoidCallback } from '../../../../../constants'

interface PaginationProps {
	totalPages: number
}

export default function usePageCounter (props: PaginationProps): [number, VoidCallback, VoidCallback] {
  const [currentPage, setCurrentPage] = useState(0)
  const { setError } = useContext(AppContext)

  const onNextPage = () => {
    if (currentPage >= props.totalPages - 1) {
      setError('cannot move beyond last page')
    } else {
      setCurrentPage(currentPage + 1)
    }
  }
  const onPreviousPage = () => {
    if (currentPage === 0) {
      setError('cannot move before first page')
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  return [currentPage, onNextPage, onPreviousPage]
}
