import schedule from 'node-schedule';
import { resetModules } from './methods.js';
import { checkTasks } from './taskChecker.js';
import { SYSTEM_SETTINGS } from './constants.js';

// 
// Every N Duration => 
//    Fetch Tasks =>
//        Check Tasks => 
//            Condition => 
//              || Response -> 
//                  || Carrot  
//                  || Stick  
//              || Continue ->
// 

console.log("Scheduler beginning..");

const taskCheckerSchedule = SYSTEM_SETTINGS.Check_Every === "sec" 
  ? `*/${SYSTEM_SETTINGS.Check_Every_N_Sec} * * * * *`
  : `*/${SYSTEM_SETTINGS.Check_Every_N_Min} * * * *`;

// Schedule the job to run every n minutes / seconds. // Edit on ./constants.js
schedule.scheduleJob(taskCheckerSchedule, checkTasks);

// Schedule to run every day at midnight.
schedule.scheduleJob(SYSTEM_SETTINGS.Reset_Schedule, resetModules);
