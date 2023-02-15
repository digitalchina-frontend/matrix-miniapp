module.exports = {
  format: '{emoji}{type}: {subject}',
  list: ['NEW', 'IMPROVE', 'FIX', 'DOC', 'RELEASE', 'TEST', 'BREAKING'],
  questions: ['type', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    NEW: {
      description: 'Use when you add something entirely new. E.g. 📦 NEW: Add Git ignore file',
      emoji: '📦',
      value: 'NEW',
    },
    IMPROVE: {
      description:
        'Use when you improve/enhance piece of code like refactoring etc. E.g. 👌 IMPROVE: Remote IP API Function',
      emoji: '👌',
      value: 'IMPROVE',
    },
    FIX: {
      description: 'Use when you fix a bug — need I say more? E.g. 🐛 FIX: Case conversion',
      emoji: '🐛',
      value: 'FIX',
    },
    DOC: {
      description:
        'Use when you add documentation like README.md, or even inline docs. E.g. 📖 DOC: API Interface Tutorial',
      emoji: '📖',
      value: 'DOC',
    },
    RELEASE: {
      description: 'Use when you release a new version. E.g. 🚀 RELEASE: Version 2.0.0',
      emoji: '🚀',
      value: 'RELEASE',
    },
    TEST: {
      description: "Use when it's related to testing. E.g. 🤖 TEST: Mock User Login/Logout",
      emoji: '🤖',
      value: 'TEST',
    },
    BREAKING: {
      description:
        'Use when releasing a change that breaks previous versions. E.g. ‼️ BREAKING: Change authentication protocol',
      emoji: '‼️',
      value: 'BREAKING',
    },
    messages: {
      type: "Select the type of change that you're committing:",
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
      breaking: 'List any breaking changes:\n',
      footer: 'Issues this commit closes, e.g #123:',
      confirmCommit: 'The packages that this commit has affected\n',
    },
  },
}
