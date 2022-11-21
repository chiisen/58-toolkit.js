const fs = require("fs")
const path = require("path")

/**
 * 寫入 alter.sql
 *
 * @param {*} subPath
 * @param {*} insertText
 */
function writeAlter(subPath, insertText, fileName) {
  checkPathAndMkdir(subPath) // 檢查路徑並建立沒有的目錄

  let alterName_ = "alter.sql"
  if (fileName) {
    alterName_ = fileName
  }
  fs.writeFileSync(`${subPath}/${alterName_}`, insertText, "utf8")
}

/**
 * 插入文字到 alter.sql
 *
 * @param {*} subPath
 * @param {*} insertText
 */
function appendAlter(subPath, insertText, fileName) {
  checkPathAndMkdir(subPath) // 檢查路徑並建立沒有的目錄

  fs.appendFileSync(`${subPath}/${fileName}`, insertText, "utf8")
}

/**
 * 檢查路徑並建立沒有的目錄
 *
 * @param {string} fileName
 */
function checkPathAndMkdir(fileName) {
  const onlyPath = path.dirname(fileName)
  const filePathList_ = onlyPath.split("/")
  let existsPath_ = ""
  filePathList_.forEach((p) => {
    existsPath_ += `${p}/`
    if (!fs.existsSync(existsPath_)) {
      fs.mkdirSync(existsPath_)
    }
  })
}

module.exports = { writeAlter, appendAlter, checkPathAndMkdir }
