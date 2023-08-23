import { request } from '&/service';
import config from './config';

/**
 * 获取咖啡
 *
 */
export const getCoffees = async () => {
	return request('GET', config.coffees, {});
};
