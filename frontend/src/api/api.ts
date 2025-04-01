import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/api'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}/api`,
	}),
	tagTypes: ['Users'],
	endpoints: () => ({}),
})
