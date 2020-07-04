import { Router } from 'express';

import middlewares from '../middlewares';

const route = Router();

export default (app) => {
  app.use('/user', route);

  route.post('/', middlewares.isAuth, async(req, res, next) => {
    return res.json({ data: "Hello" });
  });

  route.post('/history', middlewares.isAuth, async(req, res, next) => {
    return res.json({ data: "History" });
  });
};
