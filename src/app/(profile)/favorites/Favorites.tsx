'use client'

import { Skeleton } from '@/ui/skeleton'

import { useProfile } from '@/hooks/useProfile'

import { ProductCard } from '@/components'
import { cn } from '@/lib/utils'

const Favorites: React.FC = () => {
	const { profile, isLoading } = useProfile()

	return (
		<div>
			<div className={cn('grid grid-cols-3 gap-[50px] max-lg:grid-cols-2')}>
				{isLoading ? (
					<>
						{...Array(6)
							.fill(0)
							.map((_, index) => (
								<div key={index}>
									<Skeleton className='h-48 mb-4 rounded-[8px]' />
									<Skeleton className='h-8 mb-2 rounded-[8px]' />
									<Skeleton className='h-8 mb-2 rounded-[8px]' />
								</div>
							))}
					</>
				) : Array.isArray(profile?.favorites) && profile?.favorites.length > 0 ? (
					profile?.favorites.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							description={product.description}
							name={product.name}
							imageUrls={product.imageUrls}
							reviews={product.reviews}
							price={product.items?.[0]?.price}
							items={product.items}
						/>
					))
				) : (
					<div>No products found</div>
				)}
			</div>
		</div>
	)
}

export default Favorites
