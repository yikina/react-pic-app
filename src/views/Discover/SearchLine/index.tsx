import { Input } from 'antd';
import './index.scss';

function SearchLine() {
	const onSearch = (value: string) => console.log(value);
	return (
		<div className="search-line">
			<Input.Search placeholder="搜索笔记、作者、标签" onSearch={onSearch} />
		</div>
	);
}
export default SearchLine;
