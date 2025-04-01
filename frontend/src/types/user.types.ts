export interface IUser {
	id: string
	name: string
	lastname: string
	growth: number
	weight: number
	gender: TGender
	residence: string
	avatar: string
	createdAt: Date
	updatedAt: Date
}

export interface IUserForm {
	name: string
	lastname: string
	growth: number
	weight: number
	gender: TGender
	residence: string
	avatar: File
}

export type TGender = 'male' | 'female'

export enum EGender {
	male = 'Мужской',
	female = 'Женский',
}
