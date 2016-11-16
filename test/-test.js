import {expect} from 'chai'
import all from '../src'
const {isEmail, isTel, isWebUrl, isValidUrl} = all

describe('validating', () => {
  describe('email', () => {
    var address = 'eh@canada.ca'
    var invalids = ['eh', [], {}, 'mailto:eh']

    it('works for mailto:', () => {
      expect(isEmail('mailto:' + address)).to.equal('mailto:' + address)
    })
    it('works for normal email address', () => {
      expect(isEmail(address)).to.equal('mailto:' + address)
    })

    it('doesnt work for invalids', () => {
      for (let i = 0, len = invalids.length; i < len; i++) {
        expect(isTel(invalids[i])).to.be.false
      }
    })
  })

  describe('tel/phone', () => {
    var phone = '250-555-5555'
    var phoneSpaced = '250 555 5555'
    var phoneFormatted = '2505555555'
    var invalids = ['eh', [], {}, 'tel:eh']

    it('works for tel:', () => {
      expect(isTel('tel:' + phone)).to.equal('tel:' + phoneFormatted)
    })
    it('works for tel: formatted', () => {
      expect(isTel('tel:' + phoneSpaced)).to.equal('tel:' + phoneFormatted)
    })

    it('works for normal telephone', () => {
      expect(isTel(phone)).to.equal('tel:' + phoneFormatted)
    })
    it('works for normal telephone formatted', () => {
      expect(isTel(phoneSpaced)).to.equal('tel:' + phoneFormatted)
    })

    it('doesnt work for invalids', () => {
      for (let i = 0, len = invalids.length; i < len; i++) {
        expect(isTel(invalids[i])).to.be.false
      }
    })
  })

  describe('protocol', () => {
    var skypeprotocol = 'skype://1111111'
    var httpprotocol = 'http://canada.ca'
    var httpsprotocol = 'https://canada.ca'
    var invalids = ['eh', [], {}, 'ss---/ss']

    it('works for http protocol', () => {
      expect(isWebUrl(httpprotocol)).to.equal(httpprotocol)
    })
    it('works for https protocols', () => {
      expect(isWebUrl(httpsprotocol)).to.equal(httpsprotocol)
    })

    it('works for other protocols', () => {
      expect(isWebUrl(skypeprotocol)).to.equal(skypeprotocol)
    })

    it('doesnt work for invalids', () => {
      for (let i = 0, len = invalids.length; i < len; i++) {
        expect(isWebUrl(invalids[i])).to.be.false
      }
    })
  })

  describe('isValidUrl', () => {
    var telprotocol = 'tel:12505555555'
    var invalids = ['eh', [], {}, 'ss---/ss','mailto:eh']
    var valids = [
      'skype://1111111',
      'http://canada.ca',
      'https://canada.ca',
      'tel:12505555555',
      'eh@canada.ca',
      'mailto:eh@canada.ca']

    it('returns proper protocol', () => {
      expect(isValidUrl(telprotocol)).to.equal(telprotocol)
    })

    it('works for all valids', () => {
      for (let i = 0, len = valids.length; i < len; i++) {
        expect(isValidUrl(valids[i])).to.not.be.false
      }
    })

    it('doesnt work for invalids', () => {
      for (let i = 0, len = invalids.length; i < len; i++) {
        expect(isValidUrl(invalids[i])).to.be.false
      }
    })
  })

})
