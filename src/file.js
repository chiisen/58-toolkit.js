const fs = require("fs")
const path = require("path")

/**
 * 寫入 alter.sql
 *
 * @param {*} subPath
 * @param {*} insertText
 */
function writeAlter(subPath, insertText, fileName) {
  let alterName_ = "alter.sql"
  if (fileName) {
    alterName_ = fileName
  }

  const fullPath_ = `${subPath}/${alterName_}`
  checkPathAndMkdir(fullPath_) // 檢查路徑並建立沒有的目錄

  fs.writeFileSync(fullPath_, insertText, "utf8")
}

/**
 * 插入文字到 alter.sql
 *
 * @param {*} subPath
 * @param {*} insertText
 */
function appendAlter(subPath, insertText, fileName) {
  const fullPath_ = `${subPath}/${fileName}`
  checkPathAndMkdir(fullPath_) // 檢查路徑並建立沒有的目錄

  fs.appendFileSync(fullPath_, insertText, "utf8")
}

/**
 * 檢查路徑並建立沒有的目錄
 *
 * @param {string} fileName
 */
function checkPathAndMkdir(fileName) {
  const fileNameFix_ = fileName.replace("\\", "/")
  const onlyPath = path.dirname(fileNameFix_)
  const filePathList_ = onlyPath.split("/")
  let existsPath_ = ""
  filePathList_.forEach((p) => {
    existsPath_ += `${p}/`
    if (!fs.existsSync(existsPath_)) {
      fs.mkdirSync(existsPath_)
    }
  })
}

/**
 * 刪除目錄內的所有檔案
 *
 * @param {*} dirPath
 */
function emptyDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`${dirPath} not found`)
    return
  }
  const dirContents = fs.readdirSync(dirPath) // List dir content

  for (const fileOrDirPath of dirContents) {
    try {
      // Get Full path
      const fullPath = path.join(dirPath, fileOrDirPath)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        // It's a sub directory
        if (fs.readdirSync(fullPath).length) emptyDir(fullPath)
        // If the dir is not empty then remove it's contents too(recursively)
        fs.rmdirSync(fullPath)
      } else fs.unlinkSync(fullPath) // It's a file
    } catch (ex) {
      console.error(ex.message)
    }
  }
}

module.exports = { writeAlter, appendAlter, checkPathAndMkdir, emptyDir }
