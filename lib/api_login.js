const util = require('./util')
const decryptPayload = util.decryptPayload

/**
 * 登录凭证校验
 * > 临时登录凭证校验接口是一个 HTTPS 接口，开发者服务器使用 临时登录凭证code 获取 session_key 和 openid 等。
 *
 * 官方文档 https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#%E7%99%BB%E5%BD%95%E5%87%AD%E8%AF%81%E6%A0%A1%E9%AA%8C
 * @param {*} code 临时登录凭证code
 */
exports.jscode2session = function (code, callback) {
  var url = this.endpoint + '/sns/jscode2session?grant_type=authorization_code&appid=' + this.appid + '&secret=' + this.appsecret + '&js_code=' + code
  this.request(url, {dataType: 'json'}, wrapper(function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, data)
  }))
  return this
}

/**
 * 用户数据的解密
 * @param {*} code 登录凭证
 * @param {*} payload
 *  { encryptedData: 包括敏感数据在内的完整用户信息的加密数据,
 *    iv: 加密算法的初始向量
 *  }
 * @param {*} callback
 */
exports.decryptPayload = function (code, payload, callback) {
  this.jscode2session(code, (err, data) => {
    try {
      const decoded = decryptPayload(data.session_key, payload)
      if (decoded.watermark.appid !== this.appid) {
        callback(new Error('Illegal Buffer'))
      }
      callback(null, decoded)
    } catch (error) {
      callback(error)
    }
  })
}
