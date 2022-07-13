/* eslint-disable no-unused-vars */
import Router from '@koa/router';
// import AuthMiddleWare from './middlewares/auth';
const router = new Router({ prefix: '/health' });

// router.use(AuthMiddleWare);
router.get('/', async (ctx, next) => {
  // codes here
  ctx.status = 200;
  ctx.body = 'success';
});

export default router;
