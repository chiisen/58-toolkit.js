const {
  convertExcelToDenomList,
  convertExcelToExcelDenomList,
  convertExcelToDenomString,
  convertDenomListStringToExcelDenomList,
  convertListToDenomString,
  convertListToDenomConvertString,
  convertExcelToDenomConvertString,
} = require("./src/convert")

describe("convert.js", () => {
  describe("convertExcelToDenomList", () => {
    test("should convert excel array to denom list", () => {
      const result = convertExcelToDenomList([true, false, true])
      expect(result).toEqual([29, 27])
    })

    test("should return null for null input", () => {
      expect(convertExcelToDenomList(null)).toBeNull()
    })
  })

  describe("convertExcelToExcelDenomList", () => {
    test("should convert excel array to excel denom list with empty strings", () => {
      const result = convertExcelToExcelDenomList([true, false, true])
      expect(result).toEqual([29, "", 27])
    })
  })

  describe("convertExcelToDenomString", () => {
    test("should convert excel array to denom index string", () => {
      const result = convertExcelToDenomString([true, false, true])
      expect(result).toBe("29,27")
    })

    test("should return null for null input", () => {
      expect(convertExcelToDenomString(null)).toBeNull()
    })
  })

  describe("convertDenomListStringToExcelDenomList", () => {
    test("should convert denom list string to excel denom list", () => {
      const result = convertDenomListStringToExcelDenomList("29,28")
      expect(result[0]).toBe("1:100000")
      expect(result[1]).toBe("1:50000")
    })

    test("should handle single index", () => {
      const result = convertDenomListStringToExcelDenomList("15")
      expect(result[14]).toBe("1:1")
    })

    test("should return null for null input", () => {
      expect(convertDenomListStringToExcelDenomList(null)).toBeNull()
    })
  })

  describe("convertListToDenomString", () => {
    test("should convert array to denom string", () => {
      const result = convertListToDenomString([29, 28, 27])
      expect(result).toBe("29,28,27")
    })

    test("should return null for null input", () => {
      expect(convertListToDenomString(null)).toBeNull()
    })
  })

  describe("convertListToDenomConvertString", () => {
    test("should convert denom index array to convert string", () => {
      const result = convertListToDenomConvertString([15, 14])
      expect(result).toBe("'1:1','1:2'")
    })

    test("should return null for null input", () => {
      expect(convertListToDenomConvertString(null)).toBeNull()
    })
  })

  describe("convertExcelToDenomConvertString", () => {
    test("should convert excel denom index array to convert string", () => {
      const result = convertExcelToDenomConvertString([15, 14])
      expect(result).toBe("'1:1','1:2'")
    })

    test("should return null for null input", () => {
      expect(convertExcelToDenomConvertString(null)).toBeNull()
    })
  })
})
