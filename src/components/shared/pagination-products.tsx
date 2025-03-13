'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'

interface Props {
	className?: string
	totalPages: string
}

export const PaginationProducts: React.FC<Props> = ({ className, totalPages }) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentPage = +(searchParams.get('page') ?? 1)

	const changePage = (page: number) => {
		const currentQuery = qs.parse(window.location.search, { ignoreQueryPrefix: true })
		if (page >= 1 && page <= +totalPages) {
			const params = {
				...currentQuery,
				page
			}

			const query = qs.stringify(params, {
				arrayFormat: 'comma'
			})

			router.push(`?${query}`, {
				scroll: false
			})
		}
	}

	const renderPageNumbers = () => {
		const pages = []
		let showLeftEllipsis = false
		let showRightEllipsis = false

		for (let i = 1; i <= +totalPages; i++) {
			// Добавляем первую и последнюю страницы всегда
			if (i === 1 || i === +totalPages || Math.abs(i - currentPage) <= 2) {
				pages.push(
					<PaginationItem key={i}>
						<PaginationLink
							href='#'
							isActive={i === currentPage}
							onClick={() => changePage(i)}
						>
							{i}
						</PaginationLink>
					</PaginationItem>
				)
			}
			// Добавляем многоточие слева, если текущая страница не рядом с первой страницей
			else if (i < currentPage - 2 && !showLeftEllipsis) {
				pages.push(
					<PaginationItem key={`ellipsis-left-${i}`}>
						<PaginationEllipsis />
					</PaginationItem>
				)
				showLeftEllipsis = true
			}
			// Добавляем многоточие справа, если текущая страница не рядом с последней страницей
			else if (i > currentPage + 2 && !showRightEllipsis) {
				pages.push(
					<PaginationItem key={`ellipsis-right-${i}`}>
						<PaginationEllipsis />
					</PaginationItem>
				)
				showRightEllipsis = true
			}
		}

		return pages
	}

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={e => {
							if (currentPage === 1) {
								e.preventDefault() // Отменяем действие, если на первой странице
							} else {
								changePage(currentPage - 1)
							}
						}}
						className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''} // Стиль для отключенной кнопки
					/>
				</PaginationItem>
				{renderPageNumbers()}
				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={e => {
							if (currentPage === +totalPages) {
								e.preventDefault() // Отменяем действие, если на последней странице
							} else {
								changePage(currentPage + 1)
							}
						}}
						className={currentPage === +totalPages ? 'cursor-not-allowed opacity-50' : ''} // Стиль для отключенной кнопки
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
