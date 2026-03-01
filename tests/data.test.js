const {
  denomStringToDenomIndex,
  denomIndexToDenomString,
  denomStringToDenomRatio,
  denomRatioToDenomString,
  denomIndexListStringToDenomListString,
  denomIndexListStringToDefaultDenomString,
  mergeSortArray,
  overRangeListString,
  minBetList,
  betLevelList,
  denomIndexList,
} = require("../src/data")

describe("data.js", () => {
  describe("denomStringToDenomIndex", () => {
    test("should convert denom string to index", () => {
      expect(denomStringToDenomIndex("1:1")).toBe(15)
      expect(denomStringToDenomIndex("1:100000")).toBe(29)
      expect(denomStringToDenomIndex("100000:1")).toBe(1)
    })

    test("should throw for non-string input", () => {
      expect(() => denomStringToDenomIndex(123)).toThrow()
    })
  })

  describe("denomIndexToDenomString", () => {
    test("should convert denom index to string", () => {
      expect(denomIndexToDenomString(15)).toBe("1:1")
      expect(denomIndexToDenomString(29)).toBe("1:100000")
      expect(denomIndexToDenomString(1)).toBe("100000:1")
    })

    test("should throw for non-number input", () => {
      expect(() => denomIndexToDenomString("15")).toThrow()
    })
  })

  describe("denomStringToDenomRatio", () => {
    test("should convert denom string to ratio", () => {
      expect(denomStringToDenomRatio("1:1")).toBe(1)
      expect(denomStringToDenomRatio("1:100")).toBe(0.01)
      expect(denomStringToDenomRatio("100:1")).toBe(100)
    })

    test("should throw for non-string input", () => {
      expect(() => denomStringToDenomRatio(123)).toThrow()
    })
  })

  describe("denomRatioToDenomString", () => {
    test("should convert ratio to denom string", () => {
      expect(denomRatioToDenomString(1)).toBe("1:1")
      expect(denomRatioToDenomString(100)).toBe("100:1")
    })

    test("should throw for non-number input", () => {
      expect(() => denomRatioToDenomString("100")).toThrow()
    })
  })

  describe("denomIndexListStringToDenomListString", () => {
    test("should convert index list string to denom list string", () => {
      const result = denomIndexListStringToDenomListString("29,28,27")
      expect(result).toContain("1:100000")
      expect(result).toContain("1:50000")
      expect(result).toContain("1:10000")
    })

    test("should handle single index", () => {
      expect(denomIndexListStringToDenomListString("15")).toBe("1:1")
    })

    test("should throw for null input", () => {
      expect(() => denomIndexListStringToDenomListString(null)).toThrow()
    })
  })

  describe("denomIndexListStringToDefaultDenomString", () => {
    test("should return first denom string from list", () => {
      expect(denomIndexListStringToDefaultDenomString("29,28,27")).toBe("1:100000")
    })

    test("should handle single index", () => {
      expect(denomIndexListStringToDefaultDenomString("15")).toBe("1:1")
    })
  })

  describe("mergeSortArray", () => {
    test("should compare arrays as same", () => {
      expect(mergeSortArray([1, 2, 3], [1, 2, 3], "same")).toBe(true)
    })

    test("should return false for different arrays", () => {
      expect(mergeSortArray([1, 2, 3], [1, 2, 4], "same")).toBe(false)
    })

    test("should return false for different length arrays", () => {
      expect(mergeSortArray([1, 2, 3], [1, 2], "same")).toBe(false)
    })

    test("should check if source includes target", () => {
      expect(mergeSortArray([1, 2, 3, 4], [2, 3], "include")).toBe(true)
      expect(mergeSortArray([1, 2], [3, 4], "include")).toBe(false)
    })
  })

  describe("overRangeListString", () => {
    test("should return values not in range list", () => {
      expect(overRangeListString([1, 2, 3, 4], [2, 3])).toBe("1,4")
    })

    test("should return empty string when all in range", () => {
      expect(overRangeListString([1, 2], [1, 2])).toBe("")
    })
  })

  describe("constants", () => {
    test("minBetList should have 12 elements", () => {
      expect(minBetList).toHaveLength(12)
      expect(minBetList).toContain(1)
      expect(minBetList).toContain(88)
    })

    test("betLevelList should have 10 elements", () => {
      expect(betLevelList).toHaveLength(10)
      expect(betLevelList).toContain(1)
      expect(betLevelList).toContain(10)
    })

    test("denomIndexList should have 29 elements", () => {
      expect(denomIndexList).toHaveLength(29)
      expect(denomIndexList).toContain(1)
      expect(denomIndexList).toContain(29)
    })
  })
})
