/**
 * Format phone number from 10-symbol "XXXXXXXXXX" to "+7 (XXX) XXX-XX-XX".
 *
 * @param {number|string} phoneNumber 10-symbol number
 * @returns {string}
 */
module.exports.formatPhone = formatPhone = phoneNumber => {
  const num = phoneNumber.toString();
  return `+7 (${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 8)}-${num.slice(8, 10)}`;
};
