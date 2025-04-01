import { useState } from 'react'
import { Loader } from '../../components/Loader'
import { Pagination } from '../../components/Pagination'
import { Userlist } from '../../components/Userlist'
import {
	useGetAllUsersQuery,
	useGetLengthUsersQuery,
} from '../../services/user.service'
import styles from './Home.module.scss'

export const Home = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const { data, isLoading } = useGetAllUsersQuery(currentPage)
	const { data: userLength } = useGetLengthUsersQuery('getLength')

	return (
		<div>
			{isLoading && <Loader />}
			{data && (
				<div className={styles.wrapper}>
					<Userlist users={data} />
					{userLength && (
						<Pagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							userLength={userLength}
						/>
					)}
				</div>
			)}
		</div>
	)
}
