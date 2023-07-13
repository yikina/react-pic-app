import { createBrowserRouter } from 'react-router-dom';
import Home from '&/views/Home';
import Square from '&/views/Square';
import Add from '&/views/Add';

const routers = [
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/square',
		element: <Square />
	},
	{
		path: '/add',
		element: <Add />
	}
];
/*- home 首页
- square 广场
- add 发送笔记
- discover 发现
- recommend 推荐
- focus 关注
- message 消息 */

const Router = () => {
	return createBrowserRouter(routers);
};

export default Router;
