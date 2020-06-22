import { Router, response } from 'express';
import fs from 'fs'

const route = Router();

export default (app) => {
  app.use('/news', route);

  route.get('/', (req, res) => {
    const newsData = fs.readFileSync('./src/data/newsData.json')
    return res.json({
      data: JSON.parse(newsData)
    });
  })
}