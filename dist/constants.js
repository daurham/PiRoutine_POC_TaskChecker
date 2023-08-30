// import { LockBox, WaterPump } from "./GP3O/index.js";
export const Check_Every_N_Min = 5;
/**
 * @description Filter only the tasks you want to check against
 * - Default will be fetching the high priority tasks.
 * @param {Task[]} tasks An array of all my tasks.
 * @returns {Task[]} An array of filtered tasks.
 */
export const Get_Desired_Type_Of_Tasks = (tasks) => {
    return tasks.filter(task => task.priority === 4);
};
export const Desired_Tasks_Error_Description = "high priority tasks";
export const Reward_Task_Complete_On_Time = (task) => {
    // if (task.description.includes("LockBox")) {
    // LockBox.unlockLockBox();
    // }
    console.log(`  High Priority Task "${task.content}" was completed in time.`);
    console.log("  Great Job!");
};
export const Repromand_Task_Incomplete_On_Time = (task) => {
    // if (task.description.includes("WaterPump")) {
    // WaterPump.runCycle();
    // }
    console.log(`  High Priority Task "${task.content}" was not completed in time.`);
    console.log("  Do Better!");
};
/**
 * @description Print a summary of the tasks coming in.
 * @param {Task[]} desiredtasks An array of desired tasks.
 */
export const printSummary = (desiredtasks) => {
    const completed = desiredtasks.filter(task => task.isCompleted === true);
    const incompleted = desiredtasks.filter(task => task.isCompleted !== true);
    const summary = `
  [[ PROCESS SUMMARY ]]

Completed: ${JSON.stringify(completed.map(task => task.content), null, 2)}
  
Incompleted: ${JSON.stringify(incompleted.map(task => task.content), null, 2)}
    
  [[ PROCESS END ]]
  `;
    console.log(summary);
};
