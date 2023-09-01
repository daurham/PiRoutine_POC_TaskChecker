export interface SYSTEM_SETTINGSI {
  Check_Every: "min" | "sec";
  Check_Every_N_Min: number;
  Check_Every_N_Sec: number;
  Collect_Data: boolean;
  Testing: boolean;
  Print_Summary: boolean;
  Print_Log: boolean;
  Punish_Failures: boolean;
  Reward_Successes: boolean;
  Reset_Schedule: string;
}