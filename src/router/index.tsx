import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
	Home,
	Square,
	Add,
	Discover,
	Recommend,
	Focus,
	Auth,
	Me,
	NotFound
} from './constant';
import { PrivateRoute } from './auth';

const routers = [
	{
		path: '/home',
		element: <Home />,
		children: [
			{
				path: 'recommend',
				element: <Recommend />
			},
			{
				path: 'focus',
				element: <Focus />
			}
		]
	},
	{
		path: '/square',
		element: <Square />
	},
	{
		path: '/add',
		element: <PrivateRoute component={Add} />
	},
	{
		path: '/discover',
		element: <Discover />
	},
	{
		path: '/me',
		element: <PrivateRoute component={Me} />
	},
	{
		path: '/auth',
		element: <Auth />
	},
	{
		path: '/',
		element: <Navigate to="/home/recommend" />
	},
	{
		path: '*',
		element: <NotFound />
	}
];

const Router = () => {
	return createBrowserRouter(routers);
};

export default Router;
