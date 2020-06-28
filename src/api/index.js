import { Router } from 'express';

import news from './routes/news';
import currency from './routes/currency';

export default () => {
  const app = Router();
  news(app);
  currency(app);

  return app;
};
