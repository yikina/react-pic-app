import Pic from '&/assets/temPic';
import { Button, Divider, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import Footer from '&/components/Footer';
import { clearUserInfo, state } from '&/store/modules/userInfo';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

function Me() {
	const naviagte = useNavigate();
	const logout = () => {
		localStorage.removeItem('token');
		clearUserInfo();
		naviagte('/auth');
	};
	const { user } = useSnapshot(state);

	useEffect(() => {
		if (!user.username) {
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
					<h3>{user.username}</h3>
					<i className="iconfont icon-wenbenshuru" />
				</div>
				<div className="tips">
					<div>
						{user.fan}
						<h5>粉丝</h5>
					</div>
					<div>
						{user.following}
						<h5>关注</h5>
					</div>
					<div>
						{user.insignia}
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
