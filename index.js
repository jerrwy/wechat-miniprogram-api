'use strict'

var API = require('./lib/api_common')
// 登录
API.mixin(require('./lib/api_login'))
// 模板消息
API.mixin(require('./lib/api_template'))
// 客服消息
API.mixin(require('./lib/api_message'))

module.exports = API
