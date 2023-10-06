import { getPosts } from '&/api';
import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { notesData } from '&/types';
import { NoteCard, NoteInfoProps } from '&/components/NoteCard';
import { NoteInfo } from '&/components/NoteInfo';
import './index.scss';

type PostsProps = {
	queryname: string | undefined;
	token: string;
};

const Posts: React.FC<PostsProps> = ({ queryname, token }) => {
	const [notes, setNotes] = useState([]);
	const [data, setData] = useState<NoteInfoProps | {}>({});

	const [drawerVisible, setDrawerVisible] = useState(false);
	const onDrawerOpen = () => {
		setDrawerVisible(true);
	};
	const onDrawerClose = () => {
		setDrawerVisible(false);
	};
	const convertData = (data: NoteInfoProps) => {
		setData(data);
	};

	const getPostsRequest = async () => {
		const [err, res] = await getPosts(queryname as string, token);
		if (!err && res) {
			setNotes(res);
		}
	};
	useEffect(() => {
		getPostsRequest();
	}, []);
	return (
		<div className="Posts">
			{notes ? (
				<div className="Posts-notes">
					{notes.map((item: notesData, i: number) => {
						return (
							<div className="Posts-notes-card">
								<NoteCard
									key={i}
									title={item.title}
									content={item.content}
									pic={item.pic}
									collection={item.collection}
									avatar={item.user.avatar}
									nickname={item.user.nickname}
									username={item.user.username}
									onDrawerOpen={onDrawerOpen}
									convertData={convertData}
								/>
								<br />
								<br />
							</div>
						);
					})}
					<NoteInfo
						drawerVisible={drawerVisible}
						onDrawerClose={onDrawerClose}
						data={data}
					/>
				</div>
			) : (
				<Empty />
			)}
		</div>
	);
};

export default Posts;
