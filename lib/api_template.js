'use strict';

const util = require('./util');
const wrapper = util.wrapper;
const postJSON = util.postJSON;

/**
 * 获取小程序模板库标题列表
 * @param {*} offset offset和count用于分页，表示从offset开始，拉取count条记录
 * @param {*} count
 */
exports.getLibraryList = function(offset, count, callback){
  this.preRequest(this._getLibraryList, arguments);
};

exports._getLibraryList = function (offset, count, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/wxopen/template/library/list?access_token=' + this.token.accessToken;

  if (typeof offset === 'function') {
    callback = offset;
    offset = 0;
    count = 20;
  }

  const data = {
    offset,
    count
  };

  this.request(apiUrl, postJSON(data), wrapper(callback));
};

/**
 * 获取模板库某个模板标题下关键词库
 * @param {*} id 模板标题id，可通过接口获取，也可登录小程序后台查看获取
 */
exports.getLibrary = function(id, callback){
  this.preRequest(this._getLibrary, arguments);
};

exports._getLibrary = function (id, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/wxopen/template/library/get?access_token=' + this.token.accessToken;
  const data = {
    id: id
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};


/**
 * 组合模板并添加至帐号下的个人模板库
 * @param {*} id 模板标题id，可通过接口获取，也可登录小程序后台查看获取
 * @param {*} keyword_id_list 开发者自行组合好的模板关键词列表，关键词顺序可以自由搭配（例如[3,5,4]或[4,5,3]），最多支持10个关键词组合
 * @param {*} callback
 */
exports.addTemplate = function(id, keyword_id_list, callback){
  this.preRequest(this._addTemplate, arguments);
};

exports._addTemplate = function (id, keyword_id_list, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/wxopen/template/add?access_token=' + this.token.accessToken;
  const data = {
    id: id,
    keyword_id_list: keyword_id_list
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};

/**
 * 获取帐号下已存在的模板列表
 * @param {*} offset offset和count用于分页，表示从offset开始，拉取count条记录
 * @param {*} count
 */
exports.getTemplateList = function(offset, count, callback){
  this.preRequest(this._getTemplateList, arguments);
};

exports._getTemplateList = function (offset, count, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/wxopen/template/list?access_token=' + this.token.accessToken;

  if (typeof offset === 'function') {
    callback = offset;
    offset = 0;
    count = 20;
  }

  const data = {
    offset,
    count
  };

  this.request(apiUrl, postJSON(data), wrapper(callback));
};


/**
 * 删除帐号下的某个模板
 *
 * @param {String} templateId 小程序帐号下模板消息ID
 */
exports.delTemplate = function(templateId, callback){
  this.preRequest(this._delTemplate, arguments);
};

exports._delTemplate = function (templateId, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/wxopen/template/del?access_token=' + this.token.accessToken;
  const data = {
    template_id: templateId
  };
  this.request(apiUrl, postJSON(data), wrapper(callback));
};

/**
 * 发送模板消息
 * 官方文档: https://developers.weixin.qq.com/miniprogram/dev/api/notice.html#%E5%8F%91%E9%80%81%E6%A8%A1%E7%89%88%E6%B6%88%E6%81%AF
 *
 * @param {*} openid 接收者（用户）的 openid
 * @param {*} templateId 所需下发的模板消息的id
 * @param {*} page 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
 * @param {*} form_id 表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
 * @param {*} data 模板内容，不填则下发空模板
 * @param {*} color 模板内容字体的颜色，不填默认黑色 【废弃】
 * @param {*} emphasis_keyword 模板需要放大的关键词，不填则默认无放大
 * @param {*} callback 回调函数
 *
 * Callback:
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 */
exports.sendTemplate = function (openid, templateId, page, form_id, data, color, emphasis_keyword, callback) {
  this.preRequest(this._sendTemplate, arguments);
};

exports._sendTemplate = function (openid, templateId, page, form_id, data, color, emphasis_keyword, callback) {
  const apiUrl = this.endpoint + '/cgi-bin/message/wxopen/template/send?access_token=' + this.token.accessToken;
  const template = {
    touser: openid,
    template_id: templateId,
    page: page,
    form_id: form_id,
    color: color,
    emphasis_keyword: emphasis_keyword,
    data: data
  };
  this.request(apiUrl, postJSON(template), wrapper(callback));
};
