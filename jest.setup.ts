import '@testing-library/jest-dom/extend-expect';

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], 
};