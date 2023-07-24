import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '&/views/Home';
import Square from '&/views/Square';
import Add from '&/views/Add';
import Discover from '&/views/Discover';
import Me from '&/views/Me';
import Recommend from '&/views/Home/Recommend/index';
import Focus from '&/views/Home/Focus';

// Todo : home下主页面，默认路由跳转-home/recomand
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
		element: <Add />
	},
	{
		path: '/discover',
		element: <Discover />
	},
	{
		path: '/me',
		element: <Me />
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
