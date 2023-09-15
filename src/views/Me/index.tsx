import Pic from '&/assets/temPic';
import { Button, Divider, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import Footer from '&/components/Footer';
import { useEffect } from 'react';
import { useUserInfo } from '&/hooks';

function Me() {
	const naviagte = useNavigate();
	const logout = () => {
		localStorage.removeItem('token');
		naviagte('/auth');
	};
	const { user } = useUserInfo();

	useEffect(() => {
		if (!user) {
			logout();
		}
	}, []);
	return (
		<div className="me">
			<div className="me-bg">
				<img src={Pic.userBg} alt="" />
				<span onClick={logout}>
					<i className="iconfont icon-tuichu" />
				</span>
			</div>

			<div className="me-header">
				<img src={Pic.userFace} alt="" />
				<div className="me-header-name">
					<h3>{user?.info.username}</h3>
					<i className="iconfont icon-wenbenshuru" />
				</div>
				<div className="tips">
					<div>
						{user?.info.fan}
						<h5>粉丝</h5>
					</div>
					<div>
						{user?.info.following}
						<h5>关注</h5>
					</div>
					<div>
						{user?.info.insignia}
						<h5>徽章</h5>
					</div>
				</div>
				<div className="ip">
					IP属地:<span>北京</span>
				</div>
			</div>

			<div className="me-content">
				<Button type="text" block>
					我收藏的
				</Button>
				<Button type="text" block>
					我发表的
				</Button>
			</div>
			<Divider />
			<Empty />
			<Footer />
		</div>
	);
}

export default Me;
