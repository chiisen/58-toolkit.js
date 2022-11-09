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

/**
 * 面額【字串】轉面額【索引值】
 */
const denomStringToDenomIndexMap = new Map([
  ["100000:1", 1],
  ["50000:1", 2],
  ["10000:1", 3],
  ["5000:1", 4],
  ["2000:1", 5],
  ["1000:1", 6],
  ["500:1", 7],
  ["200:1", 8],
  ["100:1", 9],
  ["50:1", 10],
  ["20:1", 11],
  ["10:1", 12],
  ["5:1", 13],
  ["2:1", 14],
  ["1:1", 15],
  ["1:2", 16],
  ["1:5", 17],
  ["1:10", 18],
  ["1:20", 19],
  ["1:50", 20],
  ["1:100", 21],
  ["1:200", 22],
  ["1:500", 23],
  ["1:1000", 24],
  ["1:2000", 25],
  ["1:5000", 26],
  ["1:10000", 27],
  ["1:50000", 28],
  ["1:100000", 29],
])

/**
 * 面額【字串】轉面額【索引值】
 *
 * @param {*} denom
 * @returns
 */
function denomStringToDenomIndex(denom) {
  if (typeof denom === "string" || denom instanceof String) {
    return denomStringToDenomIndexMap.get(denom)
  }
  const msg_ = `denom: '${denom}' not string`
  console.error(msg_)
  throw msg_
}

/**
 * 面額【索引】轉成【字串】的面額
 */
const denomIndexToDenomStringArrayMap = swapMap(denomStringToDenomIndexMap)

/**
 * 面額【索引】轉成【字串】的面額
 *
 * @param {*} denom
 *
 */
function denomIndexToDenomString(denom) {
  if (isNumber(denom)) {
    //@note 使用 swapMap 轉換後，都會變成陣列，目前還沒辦法調整為字串，之後會再調整
    const denomString_ = denomIndexToDenomStringArrayMap.get(denom)
    return denomString_[0]
  }
  const msg_ = `denom: '${denom}' not number`
  console.error(msg_)
  throw msg_
}

module.exports = { denomStringToDenomIndex, denomIndexToDenomString }
