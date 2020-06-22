import NewsAPI from 'newsapi';
import _ from 'lodash';
import fs from 'fs'

import config from '../config';

const newsapi = new NewsAPI(config.newsApiKey)

export default async() => {
  let businessData = []
  let techData = []
  let parsedNewsData = []

  const parseNewsData = (newsData) => {
    return newsData.map(d => {
      return {
        source: d.source.id,
        title: d.title,
        // description: d.description,
        url: d.url,
        // urlToImage: d.urlToImage,
        publishedAt: d.publishedAt,
        // content: d.content
      }
    })
  }

  const businessNewsData = await newsapi.v2.topHeadlines({
    sources: 'bloomberg,business-insider,business-insider-uk,financial-post,fortune,the-wall-street-journal',
    language: 'en',
    pageSize: 100,
  }).then(response => response)

  const techNewsData = await newsapi.v2.topHeadlines({
    sources: 'crypto-coins-news,engadget,hacker-news,recode,techcrunch,techradar,the-next-web,the-verge,wired',
    language: 'en',
    pageSize: 100,
  }).then(response => response)

  if (businessNewsData) {
    const { articles } = businessNewsData;
    businessData = parseNewsData(articles);
  }
  
  if (techNewsData) {
    const { articles } = techNewsData;
    techData = parseNewsData(articles);
  }

  if (businessNewsData && techData) {
    parsedNewsData = [...businessData, ...techData]
    parsedNewsData =  _.groupBy(parsedNewsData, 'source')
    const orderedNewData = {}
    Object.keys(parsedNewsData).sort().forEach((key) => {
      orderedNewData[key] = parsedNewsData[key];
    })

    fs.writeFileSync('./src/data/newsData.json', JSON.stringify(orderedNewData), err => {
      if (err) throw err
      console.log("Updated!")
    })
  }
}