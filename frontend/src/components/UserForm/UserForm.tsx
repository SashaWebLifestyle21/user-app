import { ChangeEvent, FC, useState } from 'react'
import {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormReset,
	UseFormSetValue,
} from 'react-hook-form'
import { IUser, IUserForm } from '../../types/user.types'
import { Button } from '../Button'
import { Image } from '../Image'
import { InputField, InputRadio } from '../InputField'
import { Loader } from '../Loader'
import { Text } from '../Text'
import { Title } from '../Title'
import styles from './UserForm.module.scss'

interface IUserFormProps {
	user?: IUser
	button?: string
	onSubmit: SubmitHandler<IUserForm>
	register: UseFormRegister<IUserForm>
	handleSubmit: UseFormHandleSubmit<IUserForm, undefined>
	setValue: UseFormSetValue<IUserForm>
	reset: UseFormReset<IUserForm>
	errors: FieldErrors<IUserForm>
	isValid: boolean
	isLoading: boolean
	isDirty: boolean
	titleForm: string
}

export const UserForm: FC<IUserFormProps> = ({
	user,
	button = 'Создать',
	onSubmit,
	errors,
	handleSubmit,
	isValid,
	register,
	reset,
	setValue,
	isLoading,
	titleForm,
	isDirty,
}) => {
	const [preview, setPreview] = useState<string>(
		user?.avatar ? user.avatar : ''
	)

	const handleUploadedImages = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.currentTarget as HTMLInputElement
		const file: File = (target.files as FileList)[0]
		if (file) {
			const urlImage = URL.createObjectURL(file)
			setPreview(urlImage)
			setValue('avatar', file)
		}
	}

	const uploadLabel = preview ? 'Изменить' : 'Загрузить'

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Title>{titleForm}</Title>
			<div className={styles.avatar_wrapper}>
				{preview && <Image src={preview} width={100} height={100} />}
				<label className={styles.label_avatar}>
					<input
						type='file'
						multiple
						className={styles.input_avatar}
						{...register('avatar')}
						onChange={handleUploadedImages}
					/>
					<Text>{uploadLabel}</Text>
				</label>
			</div>
			<InputField
				label='Имя'
				error={errors.name?.message}
				{...register('name', {
					required: 'Обязательно к заполнению',
					minLength: {
						value: 2,
						message: 'Больше 2 символов',
					},
				})}
			/>
			<InputField
				label='Фаммлия'
				error={errors.lastname?.message}
				{...register('lastname', {
					required: 'Обязательно к заполнению',
					minLength: {
						value: 2,
						message: 'Больше 2 символов',
					},
				})}
			/>

			<InputField
				label='Рост (см)'
				error={errors.growth?.message}
				type='number'
				{...register('growth', {
					required: 'Обязательно к заполнению',
					min: {
						value: 100,
						message: 'Минимальное значение 100',
					},
					max: {
						value: 230,
						message: 'Максимальное значение 230',
					},
				})}
			/>

			<InputField
				label='Вес'
				error={errors.weight?.message}
				type='number'
				{...register('weight', {
					required: 'Обязательно к заполнению',
					min: {
						value: 1,
						message: 'Минимальное значение 1',
					},
				})}
			/>

			<div>
				<Text className={styles.text}>Пол</Text>

				<InputRadio
					label='Муж.'
					value='male'
					inputId='idmale'
					{...register('gender')}
				/>
				<InputRadio
					inputId='idfemale'
					label='Женск.'
					value='female'
					{...register('gender')}
				/>
			</div>

			<InputField
				label='Место проживания'
				error={errors.residence?.message}
				{...register('residence', {
					required: 'Обязательно к заполнению',
				})}
			/>

			<Button type='submit' disabled={!isDirty || !isValid}>
				{isLoading ? <Loader /> : button}
			</Button>

			<Button onClick={() => reset()} className={styles.reset_button}>
				Сброс
			</Button>
		</form>
	)
}
