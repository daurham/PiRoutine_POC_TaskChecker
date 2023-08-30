import schedule from 'node-schedule';
import { Task, TodoistApi } from '@doist/todoist-api-typescript'
import 'dotenv/config'
import { 
  Check_Every_N_Min, 
  Desired_Tasks_Error_Description, 
  Get_Desired_Type_Of_Tasks, 
  Repromand_Task_Incomplete_On_Time, 
  Reward_Task_Complete_On_Time, 
  printSummary
} from './constants.js';

// Every N Minutes => 
//    Fetch Tasks =>
//        Check Tasks => 
//            Condition => 
//              || Response -> 
//              || Continue -> 

const API_KEY = process.env.TODOIST_API_KEY;

/**
 * @description Fetch tasks with the highest priority
 * @returns {Promise<Task[] | undefined>} Returns tasks with the highest priority
 */
const getDesiredTasks = async (): Promise<Task[] | undefined> => {
  try {
    if (API_KEY === undefined) {
      throw new Error('TODOIST_API_KEY environment variable is not set.');
    }
    const TodoistAPI = new TodoistApi(API_KEY);
    const tasks = await TodoistAPI.getTasks();
    return Get_Desired_Type_Of_Tasks(tasks);
  } catch (error) {
    console.error(error);
  }
};


/**
 * @description Checks if high priority tasks are completed by their due time.
 * - If a task is missed or completed on time, the appropriate response can be delivered (ie: carrot / stick)
 * - Logs a summary if desired.
 * @returns {Promise<void>}
 */
const checkTasks = async (): Promise<void> => {
  try {

    // Fetch desired tasks
    const desiredtasks = await getDesiredTasks();

    // Catch fetch error
    if (desiredtasks === undefined) {
      throw new Error(`Error fetching ${Desired_Tasks_Error_Description}.`);
    }

    const currentTime = new Date();

    desiredtasks.forEach((task) => {
      // if no due time, continue
      if (!task.due?.datetime) {
        return;
      }

      const dueTime = new Date(task.due.datetime);
      const dueInMinutes = Math.round((dueTime.getTime() - currentTime.getTime()) / (1000 * 60));

      console.log(`- ${task.content}, due ${dueInMinutes >= 0 ? `in ${dueInMinutes}min` : `${Math.abs(dueInMinutes)}min ago`}`);

      // If task was not completed on time
      if (!task.isCompleted && (dueInMinutes <= 0 && dueInMinutes > -Check_Every_N_Min)) {
        Repromand_Task_Incomplete_On_Time(task)
      }
      
      // If task was completed on time
      if (task.isCompleted && (dueInMinutes <= 0 && dueInMinutes > -Check_Every_N_Min)) {
        Reward_Task_Complete_On_Time(task)
      }

    });

    printSummary(desiredtasks)
  } catch (error) {
    console.error(error);
  }
};

console.log("Process running..");
// checkTasks(); // For testing

// Schedule the job to run every "Check_Every_N_Min" minutes
schedule.scheduleJob(`*/${Check_Every_N_Min} * * * *`, () => {
  console.log(" Checking Tasks:");
  checkTasks();
});
