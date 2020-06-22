import expressLoader from './express';
import Logger from './logger';
import dataLoader from "./data";
import { fetchDataScheduler } from "../services/cron";

export default async({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  await dataLoader()
  fetchDataScheduler.start()
}