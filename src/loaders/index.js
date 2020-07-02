import expressLoader from './express';
import Logger from './logger';
import dataLoader from "./data";
import mongooseLoader from './mongoose';
import { fetchDataScheduler } from "../services/cron";

export default async({ expressApp }) => {
  await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  await dataLoader();
  fetchDataScheduler.start();
  Logger.info('✌️ Initial Data loaded');
};
