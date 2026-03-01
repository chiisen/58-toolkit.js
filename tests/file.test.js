const fs = require("fs")
const path = require("path")
const { writeAlter, appendAlter, checkPathAndMkdir, emptyDir } = require("../src/file")

describe("file.js", () => {
  const testDir = path.join(__dirname, "test_temp")
  const testFile = path.join(testDir, "test.sql")

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      emptyDir(testDir)
      fs.rmdirSync(testDir)
    }
  })

  describe("writeAlter", () => {
    test("should write file to specified path", () => {
      writeAlter(testDir, "CREATE TABLE test;", "test.sql")
      expect(fs.existsSync(testFile)).toBe(true)
      expect(fs.readFileSync(testFile, "utf8")).toBe("CREATE TABLE test;")
    })
  })

  describe("appendAlter", () => {
    test("should append text to existing file", () => {
      appendAlter(testDir, "ALTER TABLE test;", "test.sql")
      const content = fs.readFileSync(testFile, "utf8")
      expect(content).toContain("CREATE TABLE test;")
      expect(content).toContain("ALTER TABLE test;")
    })
  })

  describe("checkPathAndMkdir", () => {
    test("should create directory if not exists", () => {
      const newDir = path.join(testDir, "nested", "dir")
      const testFilePath = path.join(newDir, "file.txt")
      checkPathAndMkdir(testFilePath)
      expect(fs.existsSync(newDir)).toBe(true)
    })
  })

  describe("emptyDir", () => {
    test("should delete all files in directory", () => {
      const subDir = path.join(testDir, "sub")
      fs.mkdirSync(subDir)
      fs.writeFileSync(path.join(subDir, "file1.txt"), "test")
      fs.writeFileSync(path.join(subDir, "file2.txt"), "test")
      emptyDir(subDir)
      expect(fs.existsSync(subDir)).toBe(true)
      expect(fs.readdirSync(subDir)).toHaveLength(0)
    })

    test("should handle non-existent directory", () => {
      const nonExistentDir = path.join(testDir, "non_existent")
      expect(() => emptyDir(nonExistentDir)).not.toThrow()
    })
  })
})
