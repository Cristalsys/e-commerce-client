import { Filter } from 'lucide-react'
import React, { Suspense } from 'react'

import {
	Button,
	Container,
	FilterDrawer,
	Filtration,
	ProductsGroupList,
	SortPopup
} from '@/components'

const Products: React.FC = () => {
	return (
		<div>
			<Container>
				<div className='my-8'>
					<div className='flex justify-between items-center'>
						<div>
							<FilterDrawer>
								<Button
									variant={'ghost'}
									className='md:hidden'
								>
									<Filter />
									<b>Filters</b>
								</Button>
							</FilterDrawer>
						</div>
						<SortPopup />
					</div>
					<div className='flex gap-[70px]'>
						<div className='w-[170px] max-md:hidden'>
							<Suspense>
								<Filtration />
							</Suspense>
						</div>
						<div className='flex-1'>
							<ProductsGroupList />
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Products
