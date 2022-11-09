"use strict"

const dotenv = require("dotenv")
const fs = require("fs")

const envFile = ".env"
if (!fs.existsSync(".env")) {
  console.error(clc.red(`\n 讀檔失敗，找不到 ${envFile}`))
  process.exit(1)
}

dotenv.config()

console.log("ENV: " + process.env["ENV"]) //ENV

module.exports = {
  data: require("./data"),
  excel: require("./excel"),
}

console.log("58-toolkit 程式結束!")
