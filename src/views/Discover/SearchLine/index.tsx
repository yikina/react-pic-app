import { Input } from 'antd';
import './index.scss';

type SearchLineProps = {
	handleSearch: (value: string) => void;
};

const SearchLine: React.FC<SearchLineProps> = ({ handleSearch }) => {
	const onSearch = (value: string) => {
		value && handleSearch(value);
	};

	return (
		<div className="search-line">
			<Input.Search placeholder="搜索笔记、作者、标签" onSearch={onSearch} />
		</div>
	);
};
export default SearchLine;
