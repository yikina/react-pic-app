import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
	Home,
	Square,
	Add,
	Discover,
	Recommend,
	Focus,
	Auth,
	Me
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
	}
];

/*- home 首页
- square 广场
- add 发送笔记
- discover 发现
- recommend 推荐
- focus 关注
- message 消息 
-me 我的*/

const Router = () => {
	return createBrowserRouter(routers);
};

export default Router;
