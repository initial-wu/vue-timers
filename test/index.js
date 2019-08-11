const pkg = require('../package.json')
const Timer = require('../' + pkg.main)
const Vue = require('vue')

test('install', function () {
    Vue.use(Timer)

    const vm = new Vue()

    expect(vm.)
})