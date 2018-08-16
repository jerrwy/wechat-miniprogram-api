'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

/**
 * 获取小程序码
 *
 * 接口A: 适用于需要的码数量较少的业务场景
 * 注意：通过该接口生成的小程序码，永久有效，数量限制见文末说明，请谨慎使用。用户扫描该码进入小程序后，将直接进入 path 对应的页面。
 *
 * @param {*} page 必须是已经发布的小程序存在的页面
 * @param {*} width 二维码的宽度
 * @param {*} auto_color 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
 * @param {*} line_color auth_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"},十进制表示
 * @param {*} is_hyaline 是否需要透明底色， is_hyaline 为true时，生成透明底色的小程序码
 * @param {*} callback
 */
exports.getwxacode = function (page, width, auto_color, line_color, is_hyaline, callback) {
  this.preRequest(this._getwxacode, arguments);
};

exports.getwxacode = function (page, width, auto_color, line_color, is_hyaline, callback) {
  const apiUrl = this.endpoint + '/wxa/getwxacode?access_token=' + this.token.accessToken;
  const data = {
    'page': page,
    'width': width,
    'auto_color': auto_color,
    'line_color': line_color,
    'is_hyaline': is_hyaline
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};

/**
 * 获取小程序码
 *
 * 接口A: 适用于需要的码数量极多的业务场景
 * 注意：通过该接口生成的小程序码，永久有效，数量暂无限制。用户扫描该码进入小程序后，开发者需在对应页面获取的码中 scene 字段的值，再做处理逻辑。使用如下代码可以获取到二维码中的 scene 字段的值。调试阶段可以使用开发工具的条件编译自定义参数 scene=xxxx 进行模拟，开发工具模拟时的 scene 的参数值需要进行 urlencode
 *
 * @param {*} scene 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
 * @param {*} page 必须是已经发布的小程序存在的页面
 * @param {*} width 二维码的宽度
 * @param {*} auto_color 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
 * @param {*} line_color auth_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"},十进制表示
 * @param {*} is_hyaline 是否需要透明底色， is_hyaline 为true时，生成透明底色的小程序码
 * @param {*} callback
 */
exports.getwxacodeunlimit = function (scene, page, width, auto_color, line_color, is_hyaline, callback) {
  this.preRequest(this._getwxacodeunlimit, arguments);
};

exports.getwxacodeunlimit = function (scene, page, width, auto_color, line_color, is_hyaline, callback) {
  const apiUrl = this.endpoint + '/wxa/getwxacode?access_token=' + this.token.accessToken;
  const data = {
    'scene': scene,
    'page': page,
    'width': width,
    'auto_color': auto_color,
    'line_color': line_color,
    'is_hyaline': is_hyaline
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};

/**
 * 获取小程序二维码
 *
 * 接口C：适用于需要的码数量较少的业务场景
 * 注意：通过该接口生成的小程序二维码，永久有效，数量限制见文末说明，请谨慎使用。用户扫描该码进入小程序后，将直接进入 path 对应的页面。
 *
 * @param {*} path 不能为空，最大长度 128 字节
 * @param {*} width 二维码的宽度
 * @param {*} callback
 */
exports.createwxaqrcode = function (path, width, callback) {
  this.preRequest(this._createwxaqrcode, arguments);
};

exports.createwxaqrcode = function (path, width, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/wxaapp/createwxaqrcode?access_token=' + this.token.accessToken;
  const data = {
    'path': path,
    'width': width
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};
