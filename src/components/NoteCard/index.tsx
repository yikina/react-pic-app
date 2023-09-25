import config from '&/api/files/config';
import temPic from '&/assets/temPic';
import { Avatar } from 'antd';
import './index.scss';

type NoteCardProps = {
	title: string;
	content: string;
	pic: string;
	collection: number;
	avatar: string | null | undefined;
	nickname: string | undefined;
	username: string | undefined;
};

export const NoteCard: React.FC<NoteCardProps> = ({
	title,
	pic,
	collection,
	avatar,
	nickname,
	username
}) => {
	const avatarSrc = avatar ? config.ossUrl + '/' + avatar : temPic.userFace;
	const picSrc = pic.includes(',')
		? config.ossUrl + '/' + pic.split(',')[0]
		: config.ossUrl + '/' + pic;
	const realname = nickname ? nickname : username;

	return (
		<div className="noteCard">
			<div className="cover">
				<img alt="笔记图片" src={picSrc} />
			</div>
			<div className="text">
				<div className="title">{title}</div>
				<div className="content">
					<Avatar src={avatarSrc} />
					<span className="name">{realname}</span>
					<span className="collection">
						<i className="iconfont icon-shoucang" />
						{collection}
					</span>
				</div>
			</div>
		</div>
	);
};
