

/**
 * 数组各项总和与定值比大小
 * arr => Array
 * sum => Number
 */
export function compareSum(arr, sum) {
	return arr.reduce((prev, curr) => {
		return prev + curr
	}) > sum
} 