module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "./src",
    testRegex: ".*\\.test\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.{ts,js}", "!**/node_modules/**"],
    coverageDirectory: "../coverage",
  };
  