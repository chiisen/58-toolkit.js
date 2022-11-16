# 58-toolkit
常用用工具箱

# 其他專案如果要安裝本地的 58-toolkit 套件
```bash=
npm install --save D:\本地專案的路徑\58-toolkit.js
```

# 移除本地安裝包的 58-toolkit 套件
```bash=
npm uninstall --save 58-toolkit
```

# 安裝 58-toolkit 套件
```bash=
npm install 58-toolkit
```

# 引用 58-toolkit 套件
```javascript=
const { data, excel, convert } = require("58-toolkit")
const { denomIndexToDenomString, denomStringToDenomRatio } = data
const { writeMultiplePagesExcel } = excel
const { convertExcelToDenomList, convertListToDenomConvertString } = convert
```

# 登入 npm
```bash=
npm login
```

# 發佈 npm
```bash=
npm publish
```
- 記得修改 package.json 的 version

# 升級到最新版
```bash=
npm install 58-toolkit@latest
```