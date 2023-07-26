import Footer from '&/components/Footer';
import SearchLine from './SearchLine';
import Sort from './Sort';
import './index.scss';

function Discover() {
	return (
		<div className="discover">
			<SearchLine />
			<Sort />
			<Footer />
		</div>
	);
}

export default Discover;
