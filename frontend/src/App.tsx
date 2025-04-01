import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { CreateUser } from './pages/CreateUser'
import { Home } from './pages/Home'
import { Layout } from './pages/Layout/Layout'
import { User } from './pages/User'
import { store } from './store/store'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'users/:id',
				element: <User />,
			},
			{
				path: 'users/create',
				element: <CreateUser />,
			},
		],
	},
])

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}

export default App
