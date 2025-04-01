import { FC } from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { Header } from '../../components/Header'

export const Layout: FC = () => {
	return (
		<div>
			<Header />
			<main>
				<div className='container'>
					<Outlet />
					<ToastContainer />
				</div>
			</main>
		</div>
	)
}
