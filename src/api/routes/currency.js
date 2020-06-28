import { Router } from 'express';
import fetch from 'node-fetch';

const route = Router();

export default (app) => {
  app.use('/currency', route);

  route.get('/', async(req, res) => {
    const currencyRates =  await fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(res => res.json());

    return res.json({
      data: currencyRates
    });
  });
};
