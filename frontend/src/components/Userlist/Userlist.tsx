import { FC } from 'react'
import { IUser } from '../../types/user.types'
import { Title } from '../Title'
import { UserCard } from '../UserCard'
import styles from './Userlist.module.scss'

interface IUserlist {
	users: IUser[]
}

export const Userlist: FC<IUserlist> = ({ users }) => {
	if (users.length === 0) return <Title>Список пуст</Title>
	return (
		<div className={styles.wrapper}>
			{users.map(user => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	)
}
