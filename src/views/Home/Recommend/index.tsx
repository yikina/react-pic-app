import { getRecommandNotes } from '&/api';
import { NoteCard } from '&/components/NoteCard';
import { useRef } from 'react';
import './index.scss';
import Waterfall from '&/components/Waterfall';

function Recommend() {
	const scrollRef = useRef<HTMLDivElement>(null);

	return (
		<div className="container" ref={scrollRef}>
			<Waterfall
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
						/>
					);
				}}
			/>
		</div>
	);
}

export default Recommend;
