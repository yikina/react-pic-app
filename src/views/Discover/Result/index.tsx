import { searchNotes } from '&/api';
import { NoteCard, NoteInfoProps } from '&/components/NoteCard';
import { NoteInfo } from '&/components/NoteInfo';
import { notesData } from '&/types';
import { Divider, Empty } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import './index.scss';

type ResultProps = {
	searchValue: string;
};

const Result: React.FC<ResultProps> = ({ searchValue }) => {
	const [notes, setNotes] = useState<notesData[]>([]);

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

	const searchNotesRequest = async (value: string) => {
		const [err, res] = await searchNotes(value);
		if (!err && res) {
			setNotes(res);
		}
	};

	useEffect(() => {
		searchNotesRequest(searchValue);
	}, [searchValue]);

	return (
		<div className="result">
			<div className="result-text">搜索"{searchValue}"的结果如下：</div>
			<br />
			{notes.length ? (
				notes.map((item: notesData, i: number) => {
					return (
						<React.Fragment key={i}>
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
							<Divider />
							<NoteInfo
								drawerVisible={drawerVisible}
								onDrawerClose={onDrawerClose}
								data={data}
							/>
						</React.Fragment>
					);
				})
			) : (
				<Empty description="没有搜索到内容" />
			)}
		</div>
	);
};

export default Result;
