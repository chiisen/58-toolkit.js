const xlsx = require("node-xlsx") // 引入 node-xlsx 模組
const fs = require("fs")
const exceljs = require("exceljs")

const { isNumber } = require("./helpers")
const { checkPathAndMkdir } = require("./file")

/**
 * 讀取 Excel
 *
 * @param {string} fileName
 * @param {boolean} isLog 預設 false 不顯示 log
 * @param {number 或 string} sheetIndex 指定 sheet(可以是數字0~N或字串'My Sheet')
 */
function getExcel(fileName, isLog = false, sheetIndex = 0) {
  if (!fileName) {
    console.error(`沒有填入EXCEL檔名 fileName: ${fileName}`)
    return null
  }
  console.log(`"${fileName}-${sheetIndex}" excel-parse start`)

  const excel = []
  const sheets = xlsx.parse(fileName)
  let sheet = undefined
  const sheetIndexString = sheetIndex.toString()
  if (isNumber(sheetIndexString)) {
    sheet = sheets[sheetIndex]
  } else {
    sheet = sheets.find((x) => x.name == sheetIndexString)
  }

  // 輸出每行內容
  if (!sheet) {
    console.error(`找不到 sheetName: ${sheetIndexString}`)
  } else {
    sheet.data.forEach((row) => {
      // 陣列格式, 根據不同的索引取數據
      excel.push(row)
      if (isLog) {
        console.log(row)
      }
    })
  }

  console.log(`"${fileName}-${sheetIndex}" excel-parse end`)
  return excel
}

/**
 * 寫入單頁 Excel 檔案
 *
 * @param {string} fileName
 * @param {string} sheetName
 * @param {object} dataArray -> 
    const dataArray = [['name', 'age']]
 */
function writeSinglePageExcel(fileName, sheetName, dataArray, flag = "w") {
  if (!fileName) {
    console.error(`沒有填入EXCEL檔名 fileName: ${fileName}`)
    return null
  }
  if (!sheetName) {
    console.error(`沒有填入EXCEL工作列名稱 sheetName: ${sheetName}`)
    return null
  }
  checkPathAndMkdir(fileName) // 檢查路徑並建立沒有的目錄

  const buffer = xlsx.build([
    {
      name: sheetName,
      data: dataArray,
    },
  ])

  switch (flag) {
    case "w":
      fs.writeFileSync(fileName, buffer, { flag: "w" }) // 如果文件存在，覆盖
      break
    case "a":
      fs.appendFileSync(fileName, buffer, "utf8")
      break
  }

  console.log(`${fileName} 寫入成功!`)
}

/**
 * 寫入多頁 Excel 檔案
 *
 * @param {string} fileName
 * @param {object} buff
 */
function writeMultiplePagesExcel(fileName, buff, flag = "w") {
  if (!fileName) {
    console.error(`沒有填入EXCEL檔名 fileName: ${fileName}`)
    return null
  }
  checkPathAndMkdir(fileName) // 檢查路徑並建立沒有的目錄

  const buffer = xlsx.build(buff)

  switch (flag) {
    case "w":
      fs.writeFileSync(fileName, buffer, { flag: "w" }) // 如果文件存在，覆盖
      break
    case "a":
      fs.appendFileSync(fileName, buffer, "utf8")
      break
  }

  console.log(`${fileName} 寫入成功!`)
}

/**
 * 寫入單頁 Excel 檔案
 *
 * @param {string} fileName
 * @param {string} sheetName
 * @param {object} thisColumns [{ name: "欄位1" }, { name: "欄位2" }, { name: "欄位3" }]
 * @param {object} thisRows [
      ["張三", "22", "0911123456"],
      ["李四", "33", "0922123456"],
    ]
 */
function writeSinglePageExcelJs(fileName, sheetName, thisColumns, thisRows) {
  if (!fileName) {
    console.error(`沒有填入EXCEL檔名 fileName: ${fileName}`)
    return null
  }
  if (!sheetName) {
    console.error(`沒有填入EXCEL工作列名稱 sheetName: ${sheetName}`)
    return null
  }
  checkPathAndMkdir(fileName) // 檢查路徑並建立沒有的目錄

  const workbook = new exceljs.Workbook()
  workbook.creator = "Sam" //設定建立者
  workbook.lastModifiedBy = "58-toolkit" //上次修改人
  workbook.created = new Date(2022, 11, 21) //建立時間
  workbook.modified = new Date() //修改時間

  const sheet = workbook.addWorksheet(sheetName, { properties: { tabColor: { argb: "FFC0000" } } })
  sheet.addTable({
    name: sheetName,
    ref: "A1", // 從A1開始(先預設A1，之後再開放此功能)
    headerRow: true, // 有沒有要放標頭那一行 也就是columns的那行資料，如果設為false就會那行直接無效
    // 範例: 寫入標題
    //columns: [{ name: "欄位1" }, { name: "欄位2" }, { name: "欄位3" }],
    columns: thisColumns,
    /*
    // 範例: 寫入內容
    rows: [
      ["張三", "22", "0911123456"],
      ["李四", "33", "0922123456"],
    ],
    */
    rows: thisRows,
  })

  workbook.xlsx
    .writeFile(fileName)
    .then(() => {
      console.log(`${fileName} 寫入成功!`)
    })
    .catch((err) => {
      console.error("err", err)
    })
}

/**
 * 寫入多頁 Excel 檔案
 *
 * @param {string} fileName
 * @param {object} excelJsData [{ sheetName: "工作列1", 
 *                                columns: [{ name: "欄位1" }, { name: "欄位2" }, { name: "欄位3" }],
 *                                rows: [
 *                                  ["張三", "22", "0911123456"],
                                    ["李四", "33", "0922123456"],
                                  ]},
                                { sheetName: "工作列2", 
 *                                columns: [{ name: "欄位1" }, { name: "欄位2" }, { name: "欄位3" }],
 *                                rows: [
 *                                  ["唐三", "22", "0911123456"],
                                    ["王四", "33", "0922123456"],
                                  ]}
                                ]
 */
function writeMultiplePagesExcelJs(fileName, excelJsData) {
  if (!fileName) {
    console.error(`沒有填入EXCEL檔名 fileName: ${fileName}`)
    return null
  }
  checkPathAndMkdir(fileName) // 檢查路徑並建立沒有的目錄

  const workbook = new exceljs.Workbook()
  workbook.creator = "Sam" //設定建立者
  workbook.lastModifiedBy = "58-toolkit" //上次修改人
  workbook.created = new Date(2022, 11, 21) //建立時間
  workbook.modified = new Date() //修改時間

  excelJsData.forEach((x) => {
    //const sheet = workbook.addWorksheet(x.sheetName, { properties: { tabColor: { argb: "FFC0000" } } })
    const sheet = workbook.addWorksheet(x.sheetName)
    sheet.addTable({
      name: x.sheetName,
      ref: "A1", // 從A1開始(先預設A1，之後再開放此功能)
      headerRow: true, // 有沒有要放標頭那一行 也就是columns的那行資料，如果設為false就會那行直接無效
      columns: x.columns,
      rows: x.rows,
    })
  })

  workbook.xlsx
    .writeFile(fileName)
    .then(() => {
      console.log(`${fileName} 寫入成功!`)
    })
    .catch((err) => {
      console.error("err", err)
    })
}

module.exports = {
  getExcel,
  writeSinglePageExcel,
  writeMultiplePagesExcel,
  writeSinglePageExcelJs,
  writeMultiplePagesExcelJs,
}
