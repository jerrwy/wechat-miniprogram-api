const util = require('./util')
const wrapper = util.wrapper
const postJSON = util.postJSON
const path = require('path')
const fs = require('fs')
const formstream = require('formstream')
/**
 * 获取临时素材
 *
 * @param {String} mediaId 媒体文件的ID
 * @param {Function} callback 回调函数
 */
exports.getMedia = function (mediaId, callback) {
  this.preRequest(this._getMedia, arguments)
}

exports._getMedia = function (mediaId, callback) {
  const url = this.endpoint + '/cgi-bin/media/get?access_token=' + this.token.accessToken + '&media_id=' + mediaId
  const opts = {
    timeout: 60000 // 60秒超时
  }
  this.request(url, opts, wrapper(function (err, data, res) {
    if (err) {
      return callback(err)
    }
    const contentType = res.headers['content-type']
    if (contentType === 'application/json' || contentType === 'text/plain') {
      const ret
      try {
        ret = JSON.parse(data)
        if (ret.errcode) {
          err = new Error(ret.errmsg)
          err.name = 'WeChatAPIError'
        }
      } catch (ex) {
        callback(ex, data, res)
        return
      }
      return callback(err, ret, res)
    }
    // 输出Buffer对象
    callback(null, data, res)
  }))
}

/**
 * 新增临时素材，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
 * 详情请见：<http://mp.weixin.qq.com/wiki/5/963fc70b80dc75483a271298a76a8d59.html>
 * Examples:
 * ```
 * api.uploadMedia('filepath', type, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"type":"TYPE","media_id":"MEDIA_ID","created_at":123456789}
 * ```
 * Shortcut:
 *
 * - `exports.uploadImage(filepath, callback);`
 * - `exports.uploadVoice(filepath, callback);`
 * - `exports.uploadVideo(filepath, callback);`
 * - `exports.uploadThumb(filepath, callback);`
 *
 * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、thumb
 * @param {Function} callback 回调函数
 */
exports.uploadMedia = function (filepath, type, callback) {
  this.preRequest(this._uploadMedia, arguments)
}

exports._uploadMedia = function (filepath, type, callback) {
  var that = this
  fs.stat(filepath, function (err, stat) {
    if (err) {
      return callback(err)
    }
    var form = formstream()
    form.file('media', filepath, path.basename(filepath), stat.size)
    var url = that.endpoint + '/cgi-bin/media/upload?access_token=' + that.token.accessToken + '&type=' + type
    var opts = {
      dataType: 'json',
      type: 'POST',
      timeout: 60000, // 60秒超时
      headers: form.headers(),
      stream: form
    }
    that.request(url, opts, wrapper(callback))
  })
}

/**
 * 流式新增临时素材，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
 * 拓展自uploadMedia，实现上游上传的流数据重定向到微信服务器，省去自己服务器的文件缓存。
 * Examples:
 * ```
 * api.uploadMediaStream(req, type, callback)
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"type":"TYPE","media_id":"MEDIA_ID","created_at":123456789}
 * ```
 * Shortcut:
 *
 * - `exports.uploadImageStream(req, callback)`
 * - `exports.uploadVoiceStream(req, callback)`
 * - `exports.uploadVideoStream(req, callback)`
 * - `exports.uploadThumbStream(req, callback)`
 *
 * @param {String} req 上游Stream对象，必须包含headers属性；例如expressjs中request对象。
 * @param {String} type 媒体类型，可用值有image、voice、video、thumb
 * @param {Function} callback 回调函数
 */
exports.uploadMediaStream = function (req, type, callback) {
  this.preRequest(this._uploadMediaStream, arguments)
}

exports._uploadMediaStream = function (req, type, callback) {
  var that = this
  var url = that.endpoint + '/cgi-bin/media/upload?access_token=' + that.token.accessToken + '&type=' + type
  var opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: req.headers,
    stream: req
  }
  delete opts.headers.host
  that.request(url, opts, callback)
}

['image', 'voice', 'video', 'thumb'].forEach(function (type) {
  var method = 'upload' + type[0].toUpperCase() + type.substring(1)
  exports[method] = function (filepath, callback) {
    this.uploadMedia(filepath, type, callback)
  }
  exports[method+'Stream'] = function (req, callback) {
    this.uploadMediaStream(req, type, callback)
  }
})
