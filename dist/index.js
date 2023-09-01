import schedule from 'node-schedule';
import { resetModulesOnNewDay, } from './methods.js';
// import { scheduleRules } from './dicts.js';
import { checkTasks } from './taskChecker.js';
import { SYSTEM_SETTINGS } from './constants.js';
console.log("Scheduler beginning..");
const taskCheckerSchedule = SYSTEM_SETTINGS.Check_Every === "sec"
    ? `*/${SYSTEM_SETTINGS.Check_Every_N_Sec} * * * * *`
    : `*/${SYSTEM_SETTINGS.Check_Every_N_Min} * * * *`;
// Schedule the job to run every "Check_Every_N_Min" minutes. // Edit on ./constants.js
schedule.scheduleJob(taskCheckerSchedule, checkTasks);
// Schedule to run every day at midnight.
schedule.scheduleJob(SYSTEM_SETTINGS.Reset_Schedule, resetModulesOnNewDay);
