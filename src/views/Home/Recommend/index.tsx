import { getRecommandNotes } from '&/api';
import { NoteCard } from '&/components/NoteCard';
import { notesData } from '&/types';
import { useState, useEffect, ErrorInfo } from 'react';
import './index.scss';
import { getHalfArray } from '&/utils/index';

function Recommend() {
	const [skip, setSkip] = useState(0);
	const [notes, setNotes] = useState<notesData[]>([]);
	const [leftNotes, setLeftNotes] = useState<notesData[]>([]);
	const [rightNotes, setRightNotes] = useState<notesData[]>([]);

	const getRecommandNotesRequest = async (skip: number) => {
		const [err, res]: [ErrorInfo, notesData[]] = await getRecommandNotes(skip);
		if (!err && res) {
			const [left, right] = getHalfArray(res);
			setLeftNotes(left);
			setRightNotes(right);
		}
	};

	useEffect(() => {
		getRecommandNotesRequest(skip);
	}, [skip]);
	return (
		<div className="container">
			{leftNotes.length && rightNotes.length && (
				<div>
					<div className="container-left">
						{leftNotes.map((item) => (
							<NoteCard
								title={item.title}
								content={item.content}
								pic={item.pic}
								collection={item.collection}
								avatar={item.user.avatar}
								nickname={item.user.nickname}
								username={item.user.username}
							/>
						))}
					</div>

					<div className="container-right">
						{rightNotes.map((item) => (
							<NoteCard
								title={item.title}
								content={item.content}
								pic={item.pic}
								collection={item.collection}
								avatar={item.user.avatar}
								nickname={item.user.nickname}
								username={item.user.username}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Recommend;
