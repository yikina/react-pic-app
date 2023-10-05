import Footer from '&/components/Footer';
import SearchLine from './SearchLine';
import Sort from './Sort';
import './index.scss';
import { useState } from 'react';
import Result from './Result';

function Discover() {
	const [isSearching, setIsSearching] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = (value: string) => {
		setIsSearching(true);
		setSearchValue(value);
	};
	return (
		<div className="discover">
			<SearchLine handleSearch={handleSearch} />
			{isSearching ? <Result searchValue={searchValue} /> : <Sort />}

			<Footer />
		</div>
	);
}

export default Discover;
