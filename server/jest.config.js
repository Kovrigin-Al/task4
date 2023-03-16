/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ["js", "ts", "json", "node"],
  roots: ["<rootDir>/src/routes"],
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  preset: 'ts-jest',
  transform: {"^.+\\.(ts)$": "ts-jest"},
  testEnvironment: 'node',
};