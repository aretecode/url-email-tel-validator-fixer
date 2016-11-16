import validator from 'validator';

/**
 * @example
 * valid:
 * input: isEmail('mailto:eh@canada.ca)
 * return: 'tel:111222333'
 *
 * invalid:
 * input: isEmail([]) or isEmail({}) or isEmail('eh') or isEmail('email:nope')
 * return: false
 */
var isEmail = function isEmail(value) {
  // has to be a string
  if (typeof value !== 'string') return;

  // if it doesn't have `mailto:`, isn't an email (currently)
  if (value.includes('mailto:')) {
    // remove mail for our validator
    value = value.replace('mailto:', '');
  }

  // validate and prefix with mailto:
  var isValid = validator.isEmail(value, { protocols: ['mailto'] });
  if (isValid) {
    return 'mailto:' + value;
  }

  return false;
};

/**
 * @example
 * valid:
 * input: isTel('tel:111-222-333')
 * return: 'tel:111222333'
 *
 * invalid:
 * input: isTel([]) or isTel({}) or isTel('eh') or isTel('tel:nope')
 * return: false
 */
var isTel = function isTel(value) {
  // has to be a string
  if (typeof value !== 'string') return false;

  // if it doesn't have `tel:`, isn't a phone number (currently)
  if (value.includes('tel:')) {
    // remove tel for our regex
    value = value.replace('tel:', '');
  }

  // match only digits
  var digits = value.match(/\d/g);

  // if regex did not pass, is not valid
  if (!digits) return false;

  // if we have more than 6 digits, put them all together in a string
  // with tel:digits
  if (digits.length > 6) {
    return 'tel:' + digits.join('');
  }

  return false;
};

/**
 * @example
 * valid:
 * input: isWebUrl('https://thegrid.io')
 * return: 'https://thegrid.io'
 *
 * valid:
 * input: isWebUrl('thegrid.io')
 * return: 'http://thegrid.io'
 *
 * invalid:
 * input: isWebUrl([]) or isWebUrl({}) or isWebUrl('eh') or isWebUrl('http://')
 * return: false
 */
var isWebUrl = function isWebUrl(value) {
  // has to be a string
  if (typeof value !== 'string') return false;

  // reusable
  var hasColon = value.includes(':');

  if (!validator.isURL(value)) {
    // if it isn't a normal url, but has a special protocol
    if (/(.*\:\/\/)/g.test(value)) {
      return value;
    }

    return false;
  }

  // if it has no `:` (protocol), but it is a url, prefix with `http://`
  if (!hasColon) {
    return 'http://' + value;
  }

  return value;
};

/**
 * checks isTel, then isEmail, then isWebUrl
 */
var isValidUrl = function isValidUrl(value) {
  var isValidPhone = isTel(value);
  var isValidEmail = isEmail(value);
  var isValidUrl = isWebUrl(value);

  if (isValidPhone) return isValidPhone;
  if (isValidEmail) return isValidEmail;
  if (isValidUrl) return isValidUrl;
  return false;
};

export default { isEmail: isEmail, isTel: isTel, isWebUrl: isWebUrl, isValidUrl: isValidUrl };