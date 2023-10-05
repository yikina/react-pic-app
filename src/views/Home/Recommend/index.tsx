import { getRecommandNotes } from '&/api';
import { NoteCard, NoteInfoProps } from '&/components/NoteCard';
import { useRef, useState } from 'react';
import './index.scss';
import Waterfall from '&/components/Waterfall';
import { NoteInfo } from '&/components/NoteInfo';

function Recommend({ col }: { col: number }) {
	const scrollRef = useRef<HTMLDivElement>(null);

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

	return (
		<div className="container" ref={scrollRef}>
			<Waterfall
				cols={col}
				scrollRef={scrollRef}
				getList={getRecommandNotes}
				itemRender={(item, i) => {
					return (
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
					);
				}}
			/>
			<NoteInfo
				drawerVisible={drawerVisible}
				onDrawerClose={onDrawerClose}
				data={data}
			/>
		</div>
	);
}

export default Recommend;
