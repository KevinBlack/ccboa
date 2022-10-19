

/**
 * 截取字符串从0到倒数第n位
 */
export function lastSubstr(str, n = 1) {
	return str.substr(0, str.length - n)
}
