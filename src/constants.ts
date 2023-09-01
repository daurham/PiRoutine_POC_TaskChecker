import 'dotenv/config'
import { scheduleRules } from './dicts.js';
import { SYSTEM_SETTINGSI } from './@types.js';

export const API_KEY = process.env.TODOIST_API_KEY;

// To control the application, adjust these settings:
export const SYSTEM_SETTINGS: SYSTEM_SETTINGSI = {
  Check_Every: "min", 
  Check_Every_N_Min: 1,
  Check_Every_N_Sec: 10,
  Collect_Data: false, // Uses DB
  Testing: true,
  Print_Summary: true,
  Print_Log: true,
  Punish_Failures: true,
  Reward_Successes: true,
  Reset_Schedule: scheduleRules.EveryMidnight,
};
