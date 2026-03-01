const path = require("path")

jest.mock("fs")
jest.mock("node-xlsx")
jest.mock("exceljs")

const fs = require("fs")
const xlsx = require("node-xlsx")
const exceljs = require("exceljs")
const { getExcel, writeSinglePageExcel, writeMultiplePagesExcel } = require("../src/excel")

describe("excel.js", () => {
  const testDir = path.join(__dirname, "test_excel_temp")
  const testFile = path.join(testDir, "test.xlsx")

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.unmock("fs")
    jest.unmock("node-xlsx")
    jest.unmock("exceljs")
  })

  describe("getExcel", () => {
    test("should return null for empty filename", () => {
      const result = getExcel("")
      expect(result).toBeNull()
    })

    test("should parse excel file", () => {
      const mockSheet = {
        name: "Sheet1",
        data: [
          ["Name", "Age"],
          ["John", "25"],
        ],
      }
      xlsx.parse.mockReturnValue([mockSheet])

      const result = getExcel("test.xlsx", false, 0)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(["Name", "Age"])
    })

    test("should handle non-existent sheet", () => {
      const mockSheet = {
        name: "Sheet1",
        data: [["Test"]],
      }
      xlsx.parse.mockReturnValue([mockSheet])

      const result = getExcel("test.xlsx", false, "NonExistent")
      expect(result).toEqual([])
    })
  })

  describe("writeSinglePageExcel", () => {
    test("should return null for empty filename", () => {
      const result = writeSinglePageExcel("", "Sheet1", [["test"]])
      expect(result).toBeNull()
    })

    test("should return null for empty sheetName", () => {
      const result = writeSinglePageExcel("test.xlsx", "", [["test"]])
      expect(result).toBeNull()
    })

    test("should write excel file", () => {
      const mockBuffer = Buffer.from("test")
      xlsx.build.mockReturnValue(mockBuffer)
      fs.existsSync.mockReturnValue(true)

      writeSinglePageExcel(testFile, "Sheet1", [["Name", "Age"], ["John", "25"]])

      expect(fs.writeFileSync).toHaveBeenCalled()
    })
  })

  describe("writeMultiplePagesExcel", () => {
    test("should return null for empty filename", () => {
      const result = writeMultiplePagesExcel("", [])
      expect(result).toBeNull()
    })

    test("should write multi-page excel file", () => {
      const mockBuffer = Buffer.from("test")
      xlsx.build.mockReturnValue(mockBuffer)
      fs.existsSync.mockReturnValue(true)

      const buff = [
        { name: "Sheet1", data: [["Data1"]] },
        { name: "Sheet2", data: [["Data2"]] },
      ]

      writeMultiplePagesExcel(testFile, buff)

      expect(xlsx.build).toHaveBeenCalledWith(buff)
      expect(fs.writeFileSync).toHaveBeenCalled()
    })
  })
})
