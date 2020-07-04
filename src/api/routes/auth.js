import { Router } from 'express';

import AuthService from '../../services/auth';

const route = Router();
const AuthServiceInstance = new AuthService;

export default (app) => {
  app.use('/auth', route);

  route.post('/signUp', async(req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const { user, token } = await AuthServiceInstance.signUp({ name, email, password });
      return res.status(201).json({ user, token });
    } catch (e) {
      return next(e);
    }
  });

  route.post('/signIn', async(req, res, next) => {
    const { email, password } = req.body;
    try {
      const { user, token } = await AuthServiceInstance.signUp({ name, email, password });
      return res.json({ user, token });
    } catch (e) {
      return next(e);
    }
  });
};
