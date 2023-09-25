/**
 * @description 将数组分为左右两边，分别处理
 * @param arr []
 * @returns [leftArr,rightArr]
 */
//<T>(arr: T[]): [T[], T[]]
export const getHalfArray = <T>(arr: T[]) => {
	const halfIndex = Math.ceil(arr.length / 2);
	let leftArr = arr.slice(0, halfIndex);
	let rightArr = arr.slice(halfIndex);
	return [leftArr, rightArr];
};
