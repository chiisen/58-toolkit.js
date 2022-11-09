/**
 * 檢查是否為數值
 *
 * @param {*} n
 * @returns
 */
function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n)
}

/**
 * 交換 Map 的 Key 與 Value
 *
 * @param x
 * @return @note回傳回去的 value 會是陣列，目前還未解決
 */
const swapMap = (x) => {
  return [...x.entries()].reduce((acc, [k, v]) => {
    acc.has(v) ? acc.set(v, acc.get(v).concat(k)) : acc.set(v, [k])
    return acc
  }, new Map())
}

module.exports = { isNumber, swapMap }
