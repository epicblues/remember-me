/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src", // 컴파일 되기 전 .ts 파일만 테스트 하고 싶다.
};
