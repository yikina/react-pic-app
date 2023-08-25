import { LazyLoad } from '&/router/utils';

const Home = LazyLoad(() => import('&/views/Home'));
const Square = LazyLoad(() => import('&/views/Square'));
const Add = LazyLoad(() => import('&/views/Add'));
const Discover = LazyLoad(() => import('&/views/Discover'));
const Recommend = LazyLoad(() => import('&/views/Home/Recommend'));
const Focus = LazyLoad(() => import('&/views/Home/Focus'));
const Auth = LazyLoad(() => import('&/views/Auth'));
const Me = LazyLoad(() => import('&/views/Me'));
const NotFound = LazyLoad(() => import('&/views/NotFound'));

export { Home, Square, Add, Discover, Recommend, Focus, Auth, Me, NotFound };
