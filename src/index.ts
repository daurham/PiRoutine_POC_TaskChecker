import schedule from 'node-schedule';
import { Task, TodoistApi } from '@doist/todoist-api-typescript'
import 'dotenv/config'

const API_KEY = process.env.TODOIST_API_KEY;

/**
 * @description Fetch tasks with the highest priority
 * @returns {Promise<Task[]>} Returns tasks with the highest priority
 */
const getHighPriorityTasks = async (): Promise<Task[]> => {
  if (API_KEY === undefined) {
    throw new Error('TODOIST_API_KEY environment variable is not set.');
  }
  const api = new TodoistApi(API_KEY);
  const tasks = await api.getTasks();
  return tasks.filter(task => task.priority === 4);
}

/**
 * @description Checks if high priority tasks are completed by their due time.
 * - If a task is missed or completed on time, the appropriate response can be delivered (ie: carrot / stick)
 * - Logs a summary if desired.
 * @returns {Promise<void>}
 */
const checkTasks = async (): Promise<void> => {
  const highPriorityTasks = await getHighPriorityTasks();

  const currentTime = new Date();
  const completed = highPriorityTasks.filter(task => task.isCompleted === true);
  const incompleted = highPriorityTasks.filter(task => task.isCompleted !== true);
  const lateTasks: Task[] = [];
  let taskCount = 0;

  highPriorityTasks.forEach((task) => {
    // if no due time, continue
    if (!task.due?.datetime) {
      return;
    }

    const dueTime = new Date(task.due.datetime);
    const dueInMinutes = Math.round((dueTime.getTime() - currentTime.getTime()) / (1000 * 60));
    taskCount++;

    console.log(`- ${taskCount}). ${task.content}, due ${dueInMinutes >= 0 ? `in ${dueInMinutes}min` : `${Math.abs(dueInMinutes)}min ago`}`);

    // Collect Tasks that werent completed on time
    if (!task.isCompleted && (dueInMinutes <= 0)) {
      lateTasks.push(task);
    }

    // If task was not completed on time
    if (!task.isCompleted && (dueInMinutes <= 0 && dueInMinutes > -5)) {
      // Run the "stick" functionality for the tasks missed 
      console.log(`High Priority Task "${task.content}" was not completed in time.`);
      console.log("Do Better!");
    }

    // If task was completed on time
    if (task.isCompleted && (dueInMinutes <= 0 && dueInMinutes > -5)) {
      // Run the "carrot" functionality for the tasks missed 
      console.log(`High Priority Task "${task.content}" was completed in time.`);
      console.log("Great Job!");
    }

  });

  const summary = `
[[ PROCESS SUMMARY ]]

Completed: ${JSON.stringify(completed.map(task => task.content), null, 2)}

Incompleted: ${JSON.stringify(incompleted.map(task => task.content), null, 2)}

Late Tasks: ${JSON.stringify(lateTasks.map(task => task.content), null, 2)}

[[ PROCESS END ]]
`;
  console.log(summary);
}

console.log("Process running..");
// checkTasks(); // For testing

// Schedule the job to run every 5 minutes
schedule.scheduleJob('*/5 * * * *', () => {
  console.log(" Checking Tasks:");
  checkTasks();
});