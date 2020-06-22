import { CronJob } from 'cron';

import dataLoader from "../loaders/data";

export const fetchDataScheduler = new CronJob('0 */5 * * * *', async () => {
  console.log("Fetch Data in every 5 minutes...")
  await dataLoader();
});
