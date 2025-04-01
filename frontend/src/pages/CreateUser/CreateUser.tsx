import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/UserForm'
import { useCreateUserMutation } from '../../services/user.service'
import { IUserForm } from '../../types/user.types'

export const CreateUser = () => {
	const [createUser, { isLoading }] = useCreateUserMutation()

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<IUserForm>({
		mode: 'onChange',
		defaultValues: {
			gender: 'male',
		},
	})

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

			await createUser(formData).unwrap()
			toast.success('Пользователь создан')
			reset()
		} catch (error) {
			toast.error('Ошибка при создании')
		}
	}

	return (
		<div>
			<UserForm
				onSubmit={onSubmit}
				errors={errors}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
				isValid={isValid}
				register={register}
				reset={reset}
				setValue={setValue}
				isDirty={isDirty}
				titleForm='Создание пользователя'
			/>
		</div>
	)
}
