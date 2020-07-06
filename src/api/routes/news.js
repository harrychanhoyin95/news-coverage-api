import { Router } from 'express';
import fs from 'fs';
import _ from 'lodash';
import moment from 'moment';
import NewsAPI from 'newsapi';

import config from '../../config';

const newsapi = new NewsAPI(config.newsApiKey);

import { businessNewsSource, techNewsSource } from "../../loaders/data";

const route = Router();

export default (app) => {
  app.use('/news', route);

  route.get('/', (req, res) => {
    const { source } = req.query;
    let newsData = JSON.parse(fs.readFileSync('./src/data/newsData.json'));

    if (source === 'all') {
      newsData = _.flatten(Object.values(newsData));
      newsData = newsData.sort((a, b) => moment(b.publishedAt) - moment(a.publishedAt));
    } else {
      newsData = newsData[source];
    }

    return res.json({
      data: newsData
    });
  });

  route.get('/search', async(req, res) => {
    const { keyword, sortBy } = req.query;
    const searchResult = await newsapi.v2.everything({
      q: keyword,
      sortBy,
      language: 'en',
      pageSize: 100,
    }).then(response => response);

    return res.json({
      data: searchResult.articles
    });
  });

  route.get('/sources', (req, res) => {
    const newsSources = `${businessNewsSource},${techNewsSource}`;
    return res.json({
      sources: newsSources
    });
  });
};
