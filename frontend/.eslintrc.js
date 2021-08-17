module.exports = {
  root: true,
    env: {
      node: true
    },
    extends: [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "@vue/typescript"
    ],
    parserOptions: {
      "parser": "@typescript-eslint/parser"
    },
    rules: {
      "@typescript-eslint/semi": ["error"]
    },
    overrides: [
       // Fix no-used-vars when importing ts types in .vue files
       {
         files: ["*.vue"],
         rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error'
         }
      }
    ]
};
