import Pic from '&/assets/temPic';
import { Button, Divider, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import Footer from '&/components/Footer';
import { useEffect, useState } from 'react';
import { useUserInfo } from '&/hooks';
import { InfoDrawer } from './infoDrawer';
import config from '&/api/files/config';
import Posts from './Posts';

function Me() {
	const naviagte = useNavigate();
	const logout = () => {
		deleteuser();
		naviagte('/auth');
	};
	const { user, deleteuser } = useUserInfo();
	const avatarSrc = user.info.avatar
		? config.ossUrl + '/' + user.info.avatar
		: Pic.userFace;
	const userName = user.info.nickname ? user.info.nickname : user.info.username;

	const [collectionVisible, setCollectionVisible] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const onCollectionTrue = () => {
		setCollectionVisible(true);
	};
	const onCollectionFalse = () => {
		setCollectionVisible(false);
	};
	const onDrawerOpen = () => {
		setDrawerVisible(true);
	};
	const onDrawerClose = () => {
		setDrawerVisible(false);
	};
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
				<img src={avatarSrc} alt="" />
				<div className="me-header-name">
					<h3>{userName}</h3>
					<span onClick={onDrawerOpen}>
						<i className="iconfont icon-wenbenshuru" />
					</span>
					<InfoDrawer
						userId={user?.info.id}
						drawerVisible={drawerVisible}
						onDrawerClose={onDrawerClose}
						username={user?.info.username}
						preAvatar={user?.info.avatar}
					/>
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
				<Button type="text" block onClick={onCollectionTrue}>
					我收藏的
				</Button>
				<Button type="text" block onClick={onCollectionFalse}>
					我发表的
				</Button>
			</div>
			<Divider />
			{collectionVisible ? (
				<Empty />
			) : (
				<Posts queryname={user.info.username} token={user.accessToken} />
			)}
			<Footer />
		</div>
	);
}

export default Me;
