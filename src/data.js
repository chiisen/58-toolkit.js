const { isNumber, swapMap } = require("./helpers")

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

/**
 * 面額轉成比率
 * @note 先不改名稱，升級時才能比對程式碼
 */
const denomToRatioMap = new Map([
  ["1:100000", 0.00001],
  ["1:50000", 0.00002],
  ["1:10000", 0.0001],
  ["1:5000", 0.0002],
  ["1:2000", 0.0005],
  ["1:1000", 0.001],
  ["1:500", 0.002],
  ["1:200", 0.005],
  ["1:100", 0.01],
  ["1:50", 0.02],
  ["1:20", 0.05],
  ["1:10", 0.1],
  ["1:5", 0.2],
  ["1:2", 0.5],
  ["1:1", 1],
  ["2:1", 2],
  ["5:1", 5],
  ["10:1", 10],
  ["20:1", 20],
  ["50:1", 50],
  ["100:1", 100],
  ["200:1", 200],
  ["500:1", 500],
  ["1000:1", 1000],
  ["2000:1", 2000],
  ["5000:1", 5000],
  ["10000:1", 10000],
  ["50000:1", 50000],
  ["100000:1", 100000],
])

/**
 * 面額【字串】轉面額【比率】
 *
 * @param {*} denom
 * @returns
 */
function denomStringToDenomRatio(denom) {
  if (typeof denom === "string" || denom instanceof String) {
    return denomToRatioMap.get(denom)
  }
  const msg_ = `denom: '${denom}' not string`
  console.error(msg_)
  throw msg_
}

/**
 * 面額【比率】轉成面額【字串】
 * @note 先不改名稱，升級時才能比對程式碼
 */
const ratioToDenomArrayMap = swapMap(denomToRatioMap)

/**
 * 面額【比率】轉成面額【字串】
 *
 * @param {*} denom
 *
 */
function denomRatioToDenomString(denom) {
  if (isNumber(denom)) {
    //@note 使用 swapMap 轉換後，都會變成陣列，目前還沒辦法調整為字串，之後會再調整
    const denomString_ = ratioToDenomArrayMap.get(denom)
    return denomString_[0]
  }
  const msg_ = `denom: '${denom}' not number`
  console.error(msg_)
  throw msg_
}

/**
 * 所有 minBet 1~88 的陣列
 */
const minBetList = [1, 3, 5, 9, 10, 15, 20, 25, 30, 40, 50, 88]

/**
 * 所有 betLevel 的陣列
 */
const betLevelList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
 * 所有 denom 索引的陣列 1~29
 */
const denomIndexList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
]

module.exports = {
  denomStringToDenomIndex,
  denomIndexToDenomString,
  denomStringToDenomRatio,
  denomRatioToDenomString,
  minBetList,
  betLevelList,
  denomIndexList,
}
