import { api } from '../api/api'
import { PAGE_SIZE } from '../constants/pagination'
import { IUser } from '../types/user.types'

export const userApiSlice = api.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: (page: number = 1) => ({
				url: '/user',
				method: 'GET',
				params: {
					page,
					limit: PAGE_SIZE,
				},
			}),
			providesTags: ['Users'],
		}),
		getLengthUsers: builder.query({
			query: () => ({
				url: '/user/length',
				method: 'GET',
			}),
			providesTags: ['Users'],
		}),
		getUserById: builder.query<IUser, string>({
			query: (userId: string) => ({
				url: `/user/${userId}`,
				method: 'GET',
			}),
			providesTags: ['Users'],
		}),
		createUser: builder.mutation<IUser, FormData>({
			query: user => ({
				url: `/user`,
				method: 'POST',
				body: user,
			}),
			invalidatesTags: ['Users'],
		}),
		updateUser: builder.mutation<IUser, { userId: string; user: FormData }>({
			query: ({ userId, user }) => ({
				url: `/user/${userId}`,
				method: 'PUT',
				body: user,
			}),
			invalidatesTags: ['Users'],
		}),
		deleteUser: builder.mutation<boolean, string>({
			query: (userId: string) => ({
				url: `/user/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Users'],
		}),
	}),
})

export const {
	useGetAllUsersQuery,
	useGetUserByIdQuery,
	useCreateUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetLengthUsersQuery,
} = userApiSlice
