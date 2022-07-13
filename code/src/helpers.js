import { RATIO } from './const';
/**
 * @param {Number} status
 * @param {String} message
 * @param {Array} data
 * @returns
 */
const errorResponse = (status = 500, message = '', data = []) => {
  return {
    status,
    data,
    message,
  };
};
/**
 *
 * @param {Integer} status
 * @param {Array} data
 * @param {String} message
 * @returns
 */
const successResponse = (data = [], status = 200, message = 'success') => {
  return {
    status,
    data,
    message,
  };
};

function transferCurrency(price, from, to) {
  let result = price * RATIO[from][to];
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
    result.toFixed(2)
  );
}

export { errorResponse, successResponse, transferCurrency };
