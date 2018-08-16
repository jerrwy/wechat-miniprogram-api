'use strict'

var API = require('./lib/api_common')
// 模板消息
API.mixin(require('./lib/api_template'))

module.exports = API
