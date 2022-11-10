const { isNumber } = require("./helpers")
const { denomIndexToDenomString } = require("./data")

/**
 * EXCEL 轉成 denom 陣列
 *
 * @param excelDenomArray 要EXCEL的資料才行
 * @returns
 */
function convertExcelToDenomList(excelDenomArray) {
  if (!excelDenomArray) {
    console.log(clc.red(`Null excelDenomArray`))
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
 * EXCEL 轉成 EXCEL 格式的 denom 陣列
 *
 * @param excelDenomArray 要EXCEL的資料才行
 * @returns
 */
function convertExcelToExcelDenomList(excelDenomArray) {
  if (!excelDenomArray) {
    console.log(clc.red(`Null excelDenomArray`))
    return null
  }
  const denomList_ = []
  let denomIdx_ = 29
  excelDenomArray.forEach((r) => {
    if (r) {
      denomList_.push(denomIdx_)
    } else {
      denomList_.push("")
    }
    denomIdx_--
  })
  return denomList_
}

/**
 * EXCEL 轉成 denom 字串
 *
 * @param denomArray 要EXCEL的資料才行
 * @returns
 */
function convertExcelToDenomString(denomArray) {
  if (!denomArray) {
    console.log(clc.red(`Null denomArray`))
    return null
  }
  let denomIdx_ = 29
  let denomIndexString_ = ""
  denomArray.forEach((r) => {
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
 * 陣列轉成 denom 字串
 * @param denomArray
 * @returns
 */
function convertListToDenomString(denomArray) {
  if (!denomArray) {
    console.log(clc.red(`Null denomArray`))
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
 * 陣列轉成轉換過的 denom 字串
 * @param denomArray
 * @returns
 */
function convertListToDenomConvertString(denomArray) {
  if (!denomArray) {
    console.log(clc.red(`Null denomArray`))
    return null
  }
  let denomIndexString_ = ""
  denomArray.forEach((r) => {
    if (r) {
      if (isNumber(r)) {
        const denomString_ = denomIndexToDenomString(r)
        if (denomIndexString_ === "") {
          denomIndexString_ += denomString_
        } else {
          denomIndexString_ += "," + denomString_
        }
      } else {
        console.log(clc.red(`r(${r}) not number.`))
        return null
      }
    }
  })
  return denomIndexString_
}

/**
 * EXCEL 轉成轉換過的 denom 字串
 *
 * @param denomArray 要EXCEL的資料才行
 * @returns
 */
function convertExcelToDenomConvertString(denomArray) {
  if (!denomArray) {
    console.log(clc.red(`Null denomArray`))
    return null
  }
  let denomIndex_ = 29
  let denomIndexString_ = ""
  denomArray.forEach((r) => {
    if (r) {
      if (isNumber(r)) {
        const denomString_ = denomIndexToDenomString(r)
        if (denomIndexString_ === "") {
          denomIndexString_ += denomString_
        } else {
          denomIndexString_ += "," + denomString_
        }
      } else {
        console.log(clc.red(`r(${r}) not number.`))
        return null
      }
    }
    denomIndex_--
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
}
