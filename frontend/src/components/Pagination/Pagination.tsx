import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PAGE_SIZE } from '../../constants/pagination'
import { Button } from '../Button'
import styles from './Pagination.module.scss'

interface IPagination {
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	userLength: number
}

export const Pagination: FC<IPagination> = ({
	currentPage,
	setCurrentPage,
	userLength,
}) => {
	const [totalPages, setTotalPages] = useState<number>(1)
	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1)
	}

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1)
	}

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		if (userLength) setTotalPages(userLength / PAGE_SIZE)
	}, [userLength])
	return (
		<div className={styles.wrapper}>
			<Button onClick={handlePrevPage}>{'<'}</Button>
			<div className={styles.number_buttons}>
				{[...Array(Math.ceil(totalPages))].map((_, index) => {
					return (
						<Button
							className={styles.button}
							key={index}
							onClick={() => handlePageClick(index + 1)}
							disabled={index + 1 === currentPage}
						>
							{index + 1}
						</Button>
					)
				})}
			</div>
			<Button onClick={handleNextPage}>{'>'}</Button>
		</div>
	)
}
