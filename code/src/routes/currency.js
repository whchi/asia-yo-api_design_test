/* eslint-disable no-unused-vars */
import Router from '@koa/router';
import { successResponse, errorResponse, transferCurrency } from '../helpers';
import { SUPPORT_CURRENCY } from '../const';
const router = new Router({ prefix: '/api' });

router.get('/currency-transfer/:price/:from/:to', async (ctx, next) => {
  const { from, to, price } = ctx.params;

  if (isNaN(price)) {
    ctx.status = 422;
    ctx.body = errorResponse(422, 'Invalid price format, must be a Number');
    return await next();
  }
  if (price < 0) {
    ctx.status = 422;
    ctx.body = errorResponse(422, 'price MUST > 0');
    return await next();
  }
  let fromCurrency = from.toUpperCase();
  let toCurrency = to.toUpperCase();
  ctx.headers['Content-Type'] = 'application/json;charset=utf-8';
  if (
    !SUPPORT_CURRENCY.includes(fromCurrency) ||
    !SUPPORT_CURRENCY.includes(toCurrency)
  ) {
    ctx.status = 422;
    ctx.body = errorResponse(422, 'Invalid currency type');
    return await next();
  }

  try {
    const value = transferCurrency(price, fromCurrency, toCurrency);
    ctx.status = 200;
    ctx.body = successResponse(
      { value },
      200,
      `from ${price} ${fromCurrency} to ${value} ${toCurrency}`
    );
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
    return await next();
  }
});

export default router;
