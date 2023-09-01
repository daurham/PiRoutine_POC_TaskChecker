// import { WhiteLED, LockBox, WaterPump } from "./GP3O/index.js";
/**
 * @description Filter only the tasks you want to check against
 * - Default will be fetching the highest priority tasks.
 * @param {Task[]} tasks An array of all my tasks.
 * @returns {Task[]} An array of filtered tasks.
 */
export const Get_Desired_Type_Of_Tasks = (tasks) => {
    return tasks.filter(task => task.priority === 4);
};
/**
 * @description Stick
 * @param {Task} task
 */
export const Reward_Completed_On_Time = (task) => {
    if (task.description.toLowerCase().includes("whiteled")) {
        // WhiteLED.on();
    }
    if (task.description.toLowerCase().includes("greenled")) {
        // GreenLED.on();
    }
    if (task.description.toLowerCase().includes("blueled")) {
        // BlueLED.on();
    }
    if (task.description.toLowerCase().includes("yellowled")) {
        // YellowLED.on();
    }
    if (task.description.toLowerCase().includes("lockbox")) {
        // LockBox.unlock();
    }
    console.log(`  High Priority Task "${task.content}" was completed in time.`);
    console.log("  Great Job!");
};
/**
 * @description Stick
 * @param {Task} task
 */
export const Punish_Incompleted_On_Time = (task) => {
    if (task.description.toLowerCase().includes("redled")) {
        // RedLED.on();
    }
    if (task.description.toLowerCase().includes("waterpump")) {
        // WaterPump.runCycle();
    }
    console.log(`  High Priority Task "${task.content}" was not completed in time.`);
    console.log("  Do Better!");
};
/**
 * @description Print a summary of the tasks coming in.
 * @param {string} taskLog A sting of task logs.
 */
export const printSummary = (taskLog) => {
    // Log Tasks
    if (taskLog)
        console.log(taskLog);
};
/**
 * Reset modules on a new day
 */
export const resetModules = () => {
    console.log(`[ Resetting Modules for ${new Date().toLocaleString()} ]`);
    // Perform reset actions...
    //
    // Ex:
    // LockBox.lock();
    console.log("");
};
