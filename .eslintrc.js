module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    // "eslint:recommended",
    "standard",
    "plugin:vue/essential",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    // 'semi': 0,
    "no-debugger": 0,
    "no-console": 0,
    "no-misleading-character-class": 0,
    "no-async-promise-executor": 0,
    "no-useless-catch": 0
  }
}
