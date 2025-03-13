class AdminPage {
	HOME = '/admin'
	STATISTICS = `${this.HOME}/statistics`

	EDIT_USER(id: string) {
		return `${this.HOME}/users/${id}`
	}

	EDIT_CATEGORY(id: string) {
		return `${this.HOME}/categories/${id}`
	}

	SHOW_ORDERS(id: string) {
		return `${this.HOME}/orders/${id}`
	}

	EDIT_PRODUCTS(id: string) {
		return `${this.HOME}/products/${id}`
	}
}

export const ADMIN_PAGE = new AdminPage()
