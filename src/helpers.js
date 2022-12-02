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
 * 檢查是否超過小數點 N 位數
 * @param {number} n
 * @param {number} bit 指定小數點幾位數
 * @return true: 超過， false: 未超過
 */
function decimalPlacesLimit(n, bit, isThrow = true) {
  if (!isNumber(n)) {
    const msg_ = `n: ${n} not number`
    console.error(msg_)
    if (isThrow) {
      throw msg_
    }
    return true
  }
  const nLimit_ = n.toFixed(bit)
  const check_ = n - nLimit_
  if (check_ > 0) {
    return true
  }
  return false
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

/**
 * 相加兩個 denom 陣列
 * @param denomArrayA
 * @param denomArrayB
 */
function addTwoDenomList(denomArrayA, denomArrayB) {
  const twdDenomMap_ = new Map()
  denomArrayA.forEach((x) => {
    twdDenomMap_.set(x, x)
  })
  denomArrayB.forEach((x) => {
    const value_ = twdDenomMap_.get(x)
    if (!value_) {
      twdDenomMap_.set(x, x)
    }
  })
  const denomArray_ = []
  twdDenomMap_.forEach((x) => {
    denomArray_.push(x)
  })
  return denomArray_
}

module.exports = { isNumber, swapMap, decimalPlacesLimit, addTwoDenomList }
