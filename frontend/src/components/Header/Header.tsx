import { Link, useLocation, useNavigate } from 'react-router'
import { Button } from '../Button'
import styles from './Header.module.scss'

export const Header = () => {
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<header className={styles.header}>
			<div className='container'>
				<div className={styles.content}>
					<div>
						{location.pathname !== '/' && (
							<Button onClick={() => navigate(-1)}>Назад</Button>
						)}
					</div>

					<Link to={'/users/create'}>
						<Button>Создать пользователя</Button>
					</Link>
				</div>
			</div>
		</header>
	)
}
