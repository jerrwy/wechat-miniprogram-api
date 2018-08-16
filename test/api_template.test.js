var API = require('../')
var expect = require('expect')
var config = require('./config')

describe('api_template', () => {
  describe('getLibraryList', () => {
    it('should ok', (done) => {
      var api = new API(config.appid, config.appsecret)
      api.getLibraryList((err, data)=> {
        expect(err).toBeNull()
        expect(data.errcode).toBe(0)
        expect(data.errmsg).toBe('ok')
        done()
      })
    })

    it('should not ok', (done) => {
      var api = new API('appid', 'appsecret')
      api.getLibraryList((err, data)=> {
        expect(err).not.toBeNull()
        expect(err.name).toEqual('WeChatAPIError')
        expect(err.message).toMatch(/invalid appid hint/)
        done()
      })
    })
  })

  describe('getLibrary', () => {
    it('should ok', (done) => {
      var api = new API(config.appid, config.appsecret)
      api.getLibraryList((err1, data1) => {
        const library = data1.list[0]
        api.getLibrary(library.id, (err2, data2) => {
          expect(err2).toBeNull()
          expect(data2.errcode).toBe(0)
          expect(data2.errmsg).toBe('ok')
          expect(data2.title).toBe(library.title)
          done()
        })
      })
    })

    it('should not ok', (done) => {
      var api = new API(config.appid, config.appsecret)
      api.getLibrary('id', (err, data) => {
        expect(err).not.toBeNull()
        expect(err.name).toEqual('WeChatAPIError')
        expect(err.message).toMatch(/invalid template_id hint/)
        done()
      })
    })

    it('should not ok', (done) => {
      var api = new API('appid', 'appsecret')
      api.getLibrary('id', (err, data) => {
        expect(err).not.toBeNull()
        expect(err.name).toEqual('WeChatAPIError')
        expect(err.message).toMatch(/invalid appid hint/)
        done()
      })
    })
  })

  describe('getTemplateList', () => {
    it('should ok', (done) => {
      var api = new API(config.appid, config.appsecret)
      api.getTemplateList((err, data) => {
        expect(err).toBeNull()
        expect(data.errcode).toBe(0)
        expect(data.errmsg).toBe('ok')
        done()
      })
    })

    it('should not ok', (done) => {
      var api = new API('appid', 'appsecret')
      api.getTemplateList((err, data) => {
        expect(err).not.toBeNull()
        expect(err.name).toEqual('WeChatAPIError')
        expect(err.message).toMatch(/invalid appid hint/)
        done()
      })
    })
  })

})
