import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { UserForm } from '../../components/UserForm'
import { BASE_URL } from '../../constants/api'
import {
	useDeleteUserMutation,
	useGetUserByIdQuery,
	useUpdateUserMutation,
} from '../../services/user.service'
import { IUserForm } from '../../types/user.types'

export const User = () => {
	const { id } = useParams()
	const { data: user, isLoading: isLoadingGetUser } = useGetUserByIdQuery(
		id ?? skipToken
	)
	const [updateUser, { isLoading }] = useUpdateUserMutation()
	const [deleteUser] = useDeleteUserMutation()

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<IUserForm>({
		mode: 'onChange',
		defaultValues: {
			gender: user?.gender || 'male',
		},
	})

	useEffect(() => {
		reset({
			name: user?.name,
			lastname: user?.lastname,
			growth: user?.growth,
			weight: user?.weight,
			gender: user?.gender || 'male',
			residence: user?.residence,
		})
	}, [reset, user])

	const onSubmit: SubmitHandler<IUserForm> = async (data: IUserForm) => {
		try {
			if (!data.avatar) toast.error('Добавьте фото')
			const formData = new FormData()

			formData.append('name', data.name)
			formData.append('lastname', data.lastname)
			formData.append('growth', data.growth.toString())
			formData.append('weight', data.weight.toString())
			formData.append('residence', data.residence)
			formData.append('gender', data.gender)
			formData.append('avatar', data.avatar)

			await updateUser({ userId: user?.id || '', user: formData }).unwrap()
			toast.success('Пользователь обновлен')
		} catch (error) {
			toast.error('Ошибка при обновлении')
		}
	}

	const handleDeleteUser = async () => {
		try {
			if (user) await deleteUser(user.id).unwrap()
			toast.success('Пользователь удален')

			navigate('/')
		} catch (error) {
			toast.error('Ошибка при обновлении')
		}
	}

	return (
		<div>
			{(isLoadingGetUser || !user) && <Loader />}
			{user && (
				<>
					<Button onClick={handleDeleteUser}>Удалить пользователя</Button>
					<UserForm
						user={{ ...user, avatar: `${BASE_URL}/${user.avatar}` }}
						button='Обновить'
						errors={errors}
						handleSubmit={handleSubmit}
						isValid={isValid}
						onSubmit={onSubmit}
						register={register}
						reset={reset}
						setValue={setValue}
						isLoading={isLoading}
						titleForm='Обновление пользователя'
						isDirty={isDirty}
					/>
				</>
			)}
		</div>
	)
}
