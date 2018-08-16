'use strict'

var API = require('./lib/api_common')
// 模板消息
API.mixin(require('./lib/api_template'))
// 登录
API.mixin(require('./lib/api_login'))

module.exports = API
