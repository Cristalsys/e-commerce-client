'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Title } from '@/components/shared/title'

import { removeCartItem, updateItemQuantity } from '@/store/cart.slice'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { type CheckoutFormValues, checkoutFormSchema } from '@/utils/schemas/checkout/schema'

import {
	CartGroup,
	CheckoutAddressForm,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	WhiteBlock
} from '@/components'
import { orderService } from '@/services/order.service'
import { type TAppDispatch, useTypedSelector } from '@/store'

export default function CheckoutPage() {
	const dispatch = useDispatch<TAppDispatch>()
	const [submitting, setSubmitting] = useState(false)
	const { items, loading, totalAmount } = useCart()
	const { theme } = useTheme()
	const { profile } = useProfile()
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	const router = useRouter()

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['create payment'],
		mutationFn: (data: CheckoutFormValues) => orderService.сreateOrder(data),
		onSuccess({ data }) {
			router.push(data.url as unknown as string)
		}
	})

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true)

			toast.error('Order successfully placed! 📝 Proceeding to payment...', {
				icon: '✅'
			})
			mutate(data)
		} catch (err) {
			console.log(err)
			setSubmitting(false)
			toast.error('Failed to create order', {
				icon: '❌'
			})
		}
	}

	const onClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		dispatch(updateItemQuantity({ id, quantity: newQuantity }))
	}

	useEffect(() => {
		async function fetchUserInfo() {
			const [firstName = '', lastName = ''] = (profile?.name ?? '').split(' ')

			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
			form.setValue('email', profile?.email)
			form.setValue('phone', profile?.phone)
		}

		if (isLoggedIn) {
			fetchUserInfo()
		}
	}, [form, isLoggedIn, profile?.email, profile?.name, profile?.phone])

	return (
		<div className={`${theme !== 'dark' ? 'bg-[#F6F3F1]' : 'bg-secondary'}`}>
			<Container className='pt-10'>
				<Title
					size='lg'
					className='font-extrabold mb-8'
				>
					Placing an order
				</Title>

				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex gap-10 max-lg:flex-wrap'>
							<div className='flex flex-col gap-10 flex-1 mb-20 max-lg:mb-0'>
								<WhiteBlock title='1. Cart'>
									<CartGroup
										hasSum={false}
										items={items}
										loading={loading}
										onClickCountButton={onClickCountButton}
										removeCartItem={(id: string) => dispatch(removeCartItem(id))}
									/>
								</WhiteBlock>
								<CheckoutPersonalForm className='' />
								<CheckoutAddressForm />
							</div>
							<div className='w-[350px] max-lg:w-full max-lg:mb-20'>
								<CheckoutSidebar
									totalAmount={totalAmount}
									loading={loading || submitting}
								/>
							</div>
						</div>
					</form>
				</FormProvider>
			</Container>
		</div>
	)
}
