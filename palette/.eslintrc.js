module.exports = {
    "extends" : "airbnb-base",
    "env": {
        "browser": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "comma-dangle": 0,
        "prefer-destructuring": 0
    }
}
