import { Router } from 'express';

import auth from './routes/auth';
import news from './routes/news';
import currency from './routes/currency';

export default () => {
  const app = Router();
  auth(app);
  news(app);
  currency(app);

  return app;
};
