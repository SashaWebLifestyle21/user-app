import { FC } from 'react'
import { Link } from 'react-router'
import { BASE_URL } from '../../constants/api'
import { EGender, IUser } from '../../types/user.types'
import { Button } from '../Button'
import { Image } from '../Image'
import { InfoItem } from '../InfoItem'
import styles from './UserCard.module.scss'

interface IUserCard {
	user: IUser
}

export const UserCard: FC<IUserCard> = ({ user }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<Image
					src={`${BASE_URL}/${user.avatar}`}
					alt={`${user.name} ${user.lastname}`}
					width={100}
					height={100}
				/>
				<div className={styles.info}>
					<InfoItem
						title='Name'
						description={`${user.name} ${user.lastname}`}
					/>
					<InfoItem title='Пол' description={EGender[user.gender]} />
					<InfoItem title='Рост' description={user.growth.toString() + ' cм'} />
					<InfoItem title='Вес' description={user.weight.toString() + ' кг'} />
					<InfoItem title='Адрес' description={user.residence} />
				</div>
			</div>

			<div className={styles.buttons}>
				<Link to={`/users/${user.id}`}>
					<Button>Перейти</Button>
				</Link>
			</div>
		</div>
	)
}
