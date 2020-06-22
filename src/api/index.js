import { Router } from 'express';

import news from './routes/news';

export default () => {
  const app = Router();
  news(app);

  return app;
};
