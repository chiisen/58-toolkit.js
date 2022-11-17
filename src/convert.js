const { isNumber } = require("./helpers")
const { denomIndexToDenomString } = require("./data")

/**
 * EXCEL 格式的陣列轉成 denom 索引陣列
 * PS.計算欄位轉為 denom 索引，所以輸入為 denom 索引或 denom 都可以
 *
 * @param excelDenomArray 要EXCEL的資料才行
 * @returns denom 索引陣列
 */
function convertExcelToDenomList(excelDenomArray) {
  if (!excelDenomArray) {
    console.error(`Null excelDenomArray`)
    return null
  }
  const denomList_ = []
  let denomIdx_ = 29
  excelDenomArray.forEach((r) => {
    if (r) {
      denomList_.push(denomIdx_)
    }
    denomIdx_--
  })
  return denomList_
}

/**
 * EXCEL 格式的陣列轉成 EXCEL 格式的 denom 陣列
 * PS.計算欄位轉為 denom 索引，所以輸入為 denom 索引或 denom 都可以
 *
 * @param excelDenomArray 要EXCEL的資料才行
 * @returns EXCEL 格式的 denom 陣列
 */
function convertExcelToExcelDenomList(excelDenomArray) {
  if (!excelDenomArray) {
    console.error(`Null excelDenomArray`)
    return null
  }
  const denomList_ = []
  let denomIdx_ = 29
  excelDenomArray.forEach((r) => {
    if (r) {
      denomList_.push(denomIdx_) //@note 確認輸入是數值還是字串
    } else {
      denomList_.push("")
    }
    denomIdx_--
  })
  return denomList_
}

/**
 * EXCEL 格式的陣列轉成 denom 索引字串
 * PS.計算欄位轉為 denom 索引，所以輸入為 denom 索引或 denom 都可以
 *
 * @param excelDenomArray EXCEL 格式的陣列
 * @returns denom 索引字串
 */
function convertExcelToDenomString(excelDenomArray) {
  if (!excelDenomArray) {
    console.error(`Null excelDenomArray`)
    return null
  }
  let denomIdx_ = 29
  let denomIndexString_ = ""
  excelDenomArray.forEach((r) => {
    if (r) {
      if (denomIndexString_ === "") {
        denomIndexString_ += denomIdx_.toString()
      } else {
        denomIndexString_ += "," + denomIdx_.toString()
      }
    }
    denomIdx_--
  })
  return denomIndexString_
}

/**
 * denom 陣列純字串轉為 Excel 格式的 denom 陣列
 * @param {*} denomListString
 * @returns
 */
function convertDenomListStringToExcelDenomList(denomListString) {
  if (!denomListString) {
    console.error(`Null denomListString`)
    return null
  }

  const excelDenomList_ = []

  if (!isNumber(denomListString)) {
    const denomIndexList_ = denomListString.split(",")

    for (i = 29; i >= 1; i--) {
      if (denomIndexList_.includes(i)) {
        excelDenomList_.push(`${i}`)
      } else {
        excelDenomList_.push(``)
      }
    }
  } else {
    for (i = 29; i >= 1; i--) {
      if (denomListString === i) {
        excelDenomList_.push(`${i}`)
      } else {
        excelDenomList_.push(``)
      }
    }
  }
  return excelDenomList_
}

/**
 * denom 陣列(可以是 denom 或 denom 索引)轉成 denom 字串
 *
 * @param denomArray 可以是 denom 或 denom 索引的陣列
 * @returns denom 字串(denom 或 denom 索引)
 */
function convertListToDenomString(denomArray) {
  if (!denomArray) {
    console.error(`Null denomArray`)
    return null
  }
  let denomIndexString_ = ""
  denomArray.forEach((r) => {
    if (r) {
      if (denomIndexString_ === "") {
        denomIndexString_ += r.toString()
      } else {
        denomIndexString_ += "," + r.toString()
      }
    }
  })
  return denomIndexString_
}

/**
 * denom 【索引】陣列轉成轉換過的 denom 字串
 *
 * @param denomIndexArray denom 索引陣列
 * @returns 轉換過的 denom 字串(例如: '1:1')
 */
function convertListToDenomConvertString(denomIndexArray) {
  if (!denomIndexArray) {
    console.error(`Null denomIndexArray`)
    return null
  }
  let denomIndexString_ = ""
  denomIndexArray.forEach((r) => {
    if (r) {
      if (isNumber(r)) {
        const denomString_ = denomIndexToDenomString(r)
        if (denomIndexString_ === "") {
          denomIndexString_ += `'${denomString_}'`
        } else {
          denomIndexString_ += `,'${denomString_}'`
        }
      } else {
        console.error(`r(${r}) not number.`)
        return null
      }
    }
  })
  return denomIndexString_
}

/**
 * EXCEL 格式的 denom 【索引】轉成轉換過的 denom 字串
 *
 * @param excelDenomIndexArray 要EXCEL的資料才行
 * @returns 轉換過的 denom 字串(例如: '1:1')
 */
function convertExcelToDenomConvertString(excelDenomIndexArray) {
  if (!excelDenomIndexArray) {
    console.error(`Null excelDenomIndexArray`)
    return null
  }
  let denomIndexString_ = ""
  excelDenomIndexArray.forEach((r) => {
    if (r) {
      if (isNumber(r)) {
        const denomString_ = denomIndexToDenomString(r)
        if (denomIndexString_ === "") {
          denomIndexString_ += `'${denomString_}'`
        } else {
          denomIndexString_ += `,'${denomString_}'`
        }
      } else {
        console.error(`r(${r}) not number.`)
        return null
      }
    }
  })
  return denomIndexString_
}

module.exports = {
  convertExcelToDenomList,
  convertExcelToExcelDenomList,
  convertExcelToDenomString,
  convertListToDenomString,
  convertListToDenomConvertString,
  convertExcelToDenomConvertString,
  convertDenomListStringToExcelDenomList,
}
