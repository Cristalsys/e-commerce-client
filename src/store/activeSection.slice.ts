import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeSection: null
}

export const activeSectionSlice = createSlice({
	name: 'activeSection',
	initialState,
	reducers: {
		setActiveSection(state, action) {
			state.activeSection = action.payload
		}
	}
})

export const { setActiveSection } = activeSectionSlice.actions
