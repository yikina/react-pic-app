import { useEffect, useState } from 'react';
import './index.scss';

//TODO:1.热搜接口+div替换为a标签
function Sort() {
	const [hotword, setHotWord] = useState<string[]>([]);
	useEffect(() => {
		const words = [
			'成都街头遍地熊猫',
			'余华回应潦草小狗',
			'瑞幸回应全冰块',
			'微信内测朋友圈置顶',
			'著名电竞选手叮当猫去世消息',
			'杜苏芮或成最强台风'
		];
		setHotWord(words);
	}, []);

	return (
		<div className="sort">
			<h3 className="top">热搜</h3>
			<div className="top-content">
				{hotword.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}
			</div>
			<h3 className="bottom">分类</h3>
		</div>
	);
}

export default Sort;
