import Koa from 'koa';
import logger from 'koa-logger';
import CurrencyRoute from './routes/currency';
import HealthRoute from './routes/health';
const app = new Koa();

app.use(logger());
app.use(CurrencyRoute.routes());
app.use(HealthRoute.routes());

export default app;
