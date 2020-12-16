import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { VoidCallback } from '../../../../constants'
import { setError } from '../../../../redux/actions'

interface PaginationProps {
	totalPages: number
}

export default function usePageCounter (props: PaginationProps): [number, VoidCallback, VoidCallback] {
  const [currentPage, setCurrentPage] = useState(0)
  const dispatch = useDispatch()

  const onNextPage = () => {
    if (currentPage >= props.totalPages - 1) {
      dispatch(setError('cannot move beyond last page'))
    } else {
      setCurrentPage(currentPage + 1)
    }
  }
  const onPreviousPage = () => {
    if (currentPage === 0) {
      dispatch(setError('cannot move before first page'))
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  return [currentPage, onNextPage, onPreviousPage]
}
