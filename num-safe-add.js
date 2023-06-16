/**
 * 安全相加, 避免小数加小数遇到二进制无法精确表达小数据的问题
 * @example
 *  1.1 + 2.2 = 3.3000000000000003
 *  safeAdd(1.1, 2.2) = 3.3
 * @param a {number}
 * @param b {number}
 * @return {number}
 */
export function safeAdd(a, b) {
    if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
        throw new Error('expect Number')
    }
    if (Number.isInteger(a) && Number.isInteger(b)) {
        return a + b;
    }
    const [a1, a2] = a.toString().split('.');
    const [b1, b2] = b.toString().split('.');
    const maxBit = Math.max(a2 ? a2.length : 0, b2 ? b2.length : 0)
    const divisor = Math.pow(10, maxBit)
    const left = (a > 0 ? 1 : -1) * (Math.abs(parseInt(a1)) * divisor + (a2 ? parseInt(a2.padEnd(maxBit, '0')) : 0))
    const right = (b > 0 ? 1 : -1) * (Math.abs(parseInt(b1)) * divisor + (b2 ? parseInt(b2.padEnd(maxBit, '0')) : 0))
    return (left + right) / divisor;
}

/**
 * 安全相加,
 * @param nums {number}
 */
export function safeAdds(...nums) {
    return nums.reduce((total, el) => safeAdd(total, el), 0)
}
