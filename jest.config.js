export default {
  transform: { '.+\\.ts$': 'ts-jest', '.+\\.tsx$': 'ts-jest' },
  testEnvironment: 'jsdom',
  testRegex: '/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
