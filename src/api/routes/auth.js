import { Router } from 'express';

import AuthService from '../../services/auth';

const route = Router();
const AuthServiceInstance = new AuthService;

export default (app) => {
  app.use('/auth', route);

  route.post('/signUp', async(req, res, next) => {
    const { name, email, password } = req.body;
    console.log("email", email);
    await AuthServiceInstance.signUp({ name, email, password });
  });
};
