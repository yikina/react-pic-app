import { Empty } from 'antd';
import { useUserInfo } from '&/hooks';

function Focus() {
	const { user } = useUserInfo();

	return (
		<div>
			{user ? (
				<Empty description={'您还没有关注任何人'} />
			) : (
				<Empty description={'登录后解锁更多精彩'} />
			)}
		</div>
	);
}

export default Focus;
