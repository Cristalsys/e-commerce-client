class PublicPage {
	LOGIN = '/login'
	REGISTER = '/register'

	HOME = '/'
	FAVORITES = `${this.HOME}/favorites`

	ABOUT = '#about'
	PRODUCTS = '#products'
	CONTACT_US = '#contact_us'
	FAQS = '#faqs'

	SHOW_PRODUCT(id: string) {
		return `/products/${id}`
	}
}

export const PAGE = new PublicPage()
