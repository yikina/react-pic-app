import { Avatar, Divider, Drawer, Empty } from 'antd';
import { NoteInfoProps } from '&/components/NoteCard';
import config from '&/api/files/config';
import './index.scss';

type NoteInfoOwnProps = {
	drawerVisible: boolean;
	onDrawerClose: () => void;
	data: NoteInfoProps | {};
};

export const NoteInfo: React.FC<NoteInfoOwnProps> = ({
	drawerVisible,
	onDrawerClose,
	data
}) => {
	const { title, pic, content, avatarSrc, realname } =
		(data as NoteInfoProps) || {};
	// todo : multiple pic
	const picSrc = pic ? config.ossUrl + '/' + pic[0].url : '';

	return (
		<Drawer
			title={
				<div className="title">
					<Avatar src={avatarSrc} />
					<span>{realname}</span>
				</div>
			}
			placement="bottom"
			height={'100vh'}
			open={drawerVisible}
			onClose={onDrawerClose}
		>
			<div className="content">
				<img alt="笔记图片" src={picSrc} />
				<h3>{title}</h3>
				<div>{content}</div>
				<Divider />
				<div className="comment">共0条评论</div>
				<Empty />
			</div>
		</Drawer>
	);
};
