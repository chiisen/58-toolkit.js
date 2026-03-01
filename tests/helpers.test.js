const { isNumber, swapMap, decimalPlacesLimit, addTwoDenomList, mergeSortArrayByColor } = require("../src/helpers")

describe("helpers.js", () => {
  describe("isNumber", () => {
    test("should return true for valid numbers", () => {
      expect(isNumber("123")).toBe(true)
      expect(isNumber("0")).toBe(true)
      expect(isNumber("-123")).toBe(true)
      expect(isNumber("3.14")).toBe(true)
      expect(isNumber("1e5")).toBe(true)
    })

    test("should return false for non-numbers", () => {
      expect(isNumber("abc")).toBe(false)
      expect(isNumber("")).toBe(false)
      expect(isNumber("12a")).toBe(false)
    })
  })

  describe("swapMap", () => {
    test("should swap keys and values", () => {
      const testMap = new Map([
        ["a", 1],
        ["b", 2],
      ])
      const swapped = swapMap(testMap)
      expect(swapped.get(1)).toContain("a")
      expect(swapped.get(2)).toContain("b")
    })

    test("should handle duplicate values", () => {
      const testMap = new Map([
        ["a", 1],
        ["b", 1],
      ])
      const swapped = swapMap(testMap)
      expect(swapped.get(1)).toContain("a")
      expect(swapped.get(1)).toContain("b")
    })
  })

  describe("decimalPlacesLimit", () => {
    test("should return false when within limit", () => {
      expect(decimalPlacesLimit(1.5, 2, false)).toBe(false)
      expect(decimalPlacesLimit(1, 0, false)).toBe(false)
    })

    test("should return true when exceeding limit", () => {
      expect(decimalPlacesLimit(1.555, 2, false)).toBe(true)
    })

    test("should throw when not a number", () => {
      expect(() => decimalPlacesLimit("abc", 2, true)).toThrow()
    })
  })

  describe("addTwoDenomList", () => {
    test("should merge two arrays and sort descending", () => {
      const result = addTwoDenomList([1, 3, 5], [2, 4, 5])
      expect(result).toEqual([5, 4, 3, 2, 1])
    })

    test("should handle empty arrays", () => {
      expect(addTwoDenomList([], [])).toEqual([])
    })
  })

  describe("mergeSortArrayByColor", () => {
    test("should merge two arrays with color functions", () => {
      const includeColor = (v) => `[include:${v}]`
      const notIncludeColor = (v) => `[not:${v}]`
      const result = mergeSortArrayByColor([1, 2], [2, 3], includeColor, notIncludeColor)
      expect(result).toContain("[include:1]")
      expect(result).toContain("[include:2]")
      expect(result).toContain("[not:3]")
    })
  })
})
