const util = require('./util')
const wrapper = util.wrapper
const postJSON = util.postJSON

/**
 * 客服消息，发送文字消息
 * @param {String} openid 用户的openid
 * @param {String} text 发送的消息内容
 * @param {Function} callback
 */
exports.sendText = function (openid, text, callback) {
  this.preRequest(this._sendText, arguments)
}

exports._sendText = function (openid, text, callback) {
  var url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken
  var data = {
    'touser': openid,
    'msgtype': 'text',
    'text': {
      'content': text
    }
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 客服消息，发送图片消息
 *
 * @param {String} openid 用户的openid
 * @param {String} mediaId 媒体文件的ID，参见uploadMedia方法
 * @param {Function} callback 回调函数
 */
exports.sendImage = function (openid, mediaId, callback) {
  this.preRequest(this._sendImage, arguments)
}

exports._sendImage = function (openid, mediaId, callback) {
  var url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken
  var data = {
    'touser': openid,
    'msgtype':'image',
    'image': {
      'media_id': mediaId
    }
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 客服消息，发送图文链接
 *
 * @param {String} openid 用户的openid
 * @param {Array} link 图文链接
 * @param {Function} callback 回调函数
 */
exports.sendLink = function (openid, link, callback) {
  this.preRequest(this._sendLink, arguments);
}

exports._sendLink = function (openid, link, callback) {
  var url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken
  var data = {
    'touser': openid,
    'msgtype':'link',
    'link': {
      'title': link.title,
      'description': link.description,
      'url': link.url,
      'thumb_url': link.thumb_url
    }
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 客服消息，发送小程序卡片
 *
 * @param {String} openid 用户的openid
 * @param {Array} miniprogrampage 小程序卡片
 * @param {Function} callback 回调函数
 */
exports.sendMiniProgramPage = function (openid, miniprogrampage, callback) {
  this.preRequest(this._sendMiniProgramPage, arguments);
}


exports._sendMiniProgramPage = function (openid, miniprogrampage, callback) {
  var url = this.endpoint + '/cgi-bin/message/custom/send?access_token=' + this.token.accessToken
  var data = {
    'touser': openid,
    'msgtype':'miniprogrampage',
    'miniprogrampage': {
      'title': miniprogrampage.title,
      "pagepath": miniprogrampage.pagepath,
      'thumb_media_id': miniprogrampage.thumb_media_id
    }
  }
  this.request(url, postJSON(data), wrapper(callback))
}
