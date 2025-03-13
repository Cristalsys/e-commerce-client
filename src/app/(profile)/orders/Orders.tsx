'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Accordion, OrderACcordion } from '@/components'
import { orderService } from '@/services/order.service'

const Orders: React.FC = () => {
	const [openItem, setOpenItem] = useState<string | undefined>(undefined)

	const { data } = useQuery({
		queryKey: ['get-orders-by-user'],
		queryFn: () => orderService.getOrdersByUserId(),
		select: ({ data }) => data
	})

	return (
		<div>
			<Accordion
				type='single'
				collapsible
				value={openItem}
				onValueChange={setOpenItem}
				className='flex flex-col gap-y-8'
			>
				{data &&
					data.map(item => (
						<OrderACcordion
							key={item.id}
							item={item}
							openItem={openItem}
						/>
					))}
			</Accordion>
		</div>
	)
}

export default Orders
