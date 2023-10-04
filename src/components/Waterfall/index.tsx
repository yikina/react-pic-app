import { useCalculativeWidth } from '&/hooks';
import { notesData } from '&/types';
import _ from 'lodash';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';

export interface waterfallItem {
	/**高:宽的大致比例，用于每一轮获取数据时的估计高度 */
	scale: number;
}
/**瀑布流组件的props */
export interface waterfallProps<T> {
	/**本组件的外层的ref。用于监听元素的滚动（谁滚动就填谁） */
	scrollRef: RefObject<HTMLDivElement>;
	/**一行个数（要多少列）默认2*/
	cols?: number;
	/**每列之间的间距，默认15 */
	marginX?: number;
	/**下拉触底、组件初次渲染时，触发的函数。用来获取新一轮的数据，需要return出新列表 */
	getList: (skip: number) => Promise<[any, any]>;
	/**元素的渲染函数 */
	itemRender: (item: T, i: number) => ReactNode;
}
/**展示瀑布流的组件  */
export default function Waterfall<T extends notesData>(
	props: waterfallProps<T>
) {
	const { scrollRef, cols = 2, marginX = 15, getList, itemRender } = props;
	/**瀑布流最外层的ref */
	const listRef = useRef<HTMLDivElement>(null);
	/**每一列的ref。是个数组 */
	const colRef = useRef<(HTMLDivElement | null)[]>([]);
	/**瀑布流每个模块的宽度。随着窗口大小变化而变化 */
	const imgWidth = useCalculativeWidth(listRef, marginX, cols);

	const [list, setList] = useState<T[]>([]); //用来暂时存储获取到的最新list。
	const [colList, setColList] = useState(
		Array.from({ length: cols }, () => new Array<T>())
	); //要展示的图片列表，二维数组
	const [colHeight, setColHeight] = useState(new Array<number>(cols).fill(0)); //当前每一列的高度

	const scrollHeight = useRef(0); //滚动高度
	const skip = useRef(0); //后端分页传参

	/**获取列表数据 */
	const _getList = async (skip: number) => {
		const [err, res] = await getList(skip);
		if (err) {
			console.log('获取列表数据失败', err);
			return;
		}
		setList(res);
	};
	/**把获取到的列表，按照规律放入二维数组中。 注，需要监听list的变化，再做这个函数，否则无法获取到最新的colList */
	const listToColList = (list: T[]) => {
		const _colList = _.cloneDeep(colList); //进行深拷贝
		const _colHeight = _.cloneDeep(colHeight);
		for (let i = 0; i < list.length; i++) {
			//获取当前最短的列表
			let minHeight = Infinity;
			let minHeightindex = 0;
			_colHeight.forEach((k, i) => {
				if (k < minHeight) {
					minHeight = k;
					minHeightindex = i;
				}
			});
			//加上预估的高度，便于下一个元素正确插入
			_colHeight[minHeightindex] += imgWidth * list[i].pic[0].hwscale; //预估的图片高度，后面会更换为真实高度
			_colList[minHeightindex].push(list[i]);
		}
		setColList(_colList);

		//tip: 计算真实高度的函数，在下面的useEffect中，这样才能保证获取到渲染后的数据
	};

	//初始化列表
	useEffect(() => {
		_getList(skip.current);
	}, []);

	//监听滚动事件，绑定触底加载函数
	useEffect(() => {
		//这里的this是 scrollRef.current 。 scrollRef是props中传递过来的
		const handler = function (this: HTMLElement) {
			//scrollHeight是可滚动区域的总高度， innerHeight是可视窗口的高度， scrollTop是盒子可视窗口的最顶部，到盒子可滚动上限的距离
			if (
				scrollHeight.current - window.innerHeight - this.scrollTop <
				-window.innerHeight + 50
			) {
				skip.current = skip.current + 1;
				_getList(skip.current);
				scrollHeight.current = this.scrollHeight;
			}
		};
		/**利用节流函数，避免频繁的获取元素导致重排重绘，且可以防止触底瞬间多次调用请求函数 */

		const throttleHandler = _.throttle(handler, 5000);
		scrollRef.current?.addEventListener('scroll', throttleHandler);
		return () =>
			scrollRef.current?.removeEventListener('scroll', throttleHandler);
	}, []);

	//监听list的变化，变化了就执行插入二维数组函数
	useEffect(() => {
		listToColList(list);
	}, [list]);

	//当数据渲染后，再去计算真实高度
	useEffect(() => {
		if (colRef.current) {
			const newHeight = colRef.current.map((k) => k?.offsetHeight || 0);
			setColHeight(newHeight);
		}
	}, [colList]);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'space-evenly'
			}}
			ref={listRef}
		>
			{colList.map((list, listI) => {
				return (
					<div
						key={listI}
						ref={(r) => (colRef.current[listI] = r)}
						style={{ width: imgWidth }}
					>
						{list.map((k, i) => {
							return itemRender(k, i);
						})}
					</div>
				);
			})}
		</div>
	);
}
