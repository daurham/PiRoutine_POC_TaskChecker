var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TodoistApi } from '@doist/todoist-api-typescript';
import { API_KEY, SYSTEM_SETTINGS } from './constants.js';
import { ErrorMessage } from './dicts.js';
import { Get_Desired_Type_Of_Tasks, Punish_Incompleted_On_Time, Reward_Completed_On_Time, printSummary } from './methods.js';
/**
 * @description Fetch tasks with the highest priority
 * @returns {Promise<Task[] | undefined>} Returns tasks with the highest priority
 */
const getDesiredTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (API_KEY === undefined) {
            throw new Error(ErrorMessage.TODOIST_API_KEY_NOT_SET);
        }
        const TodoistAPI = new TodoistApi(API_KEY);
        const tasks = yield TodoistAPI.getTasks();
        return Get_Desired_Type_Of_Tasks(tasks);
    }
    catch (error) {
        console.error(error);
    }
});
/**
 * @description Checks if high priority tasks are completed by their due time.
 * - If a task is missed or completed on time, the appropriate response can be delivered (ie: carrot / stick)
 * - Logs a summary if desired.
 * @returns {Promise<void>}
 */
export const checkTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (SYSTEM_SETTINGS.Print_Log === true) {
            console.log(`< Checking Tasks at ${new Date().toLocaleString()} >`);
        }
        // Fetch desired tasks
        const desiredtasks = yield getDesiredTasks();
        // Catch fetch error
        if (desiredtasks === undefined) {
            throw new Error(ErrorMessage.TASK_FETCHING_ERROR);
        }
        const currentTime = new Date();
        let log = "";
        let count = 0;
        // Check Tasks
        desiredtasks.forEach((task) => {
            var _a;
            // if no due time, continue
            if (!((_a = task.due) === null || _a === void 0 ? void 0 : _a.datetime)) {
                return;
            }
            const addNewLine = count === 0 ? "" : "\n";
            const dueTime = new Date(task.due.datetime);
            const dueInMinutes = Math.round((dueTime.getTime() - currentTime.getTime()) / (1000 * 60));
            const dueInSeconds = Math.round((dueTime.getTime() - currentTime.getTime()) / (1000));
            let inTimeRange = false;
            if (count === 0) {
                count++;
            }
            // Log each task and its due time
            if (SYSTEM_SETTINGS.Check_Every === "sec") {
                log += `${addNewLine} - ${task.content}, due ${dueInMinutes >= 0 ? `in ${dueInMinutes} min` : `${Math.abs(dueInMinutes)} min ago`}`;
                log += ` || ${dueInSeconds >= 0 ? `in ${dueInSeconds} sec` : `${Math.abs(dueInSeconds)} sec ago`}`;
                inTimeRange = dueInSeconds <= 0 && dueInSeconds > -SYSTEM_SETTINGS.Check_Every_N_Sec;
            }
            else if (SYSTEM_SETTINGS.Check_Every === "min") {
                log += `${addNewLine} - ${task.content}, due ${dueInMinutes >= 0 ? `in ${dueInMinutes} min` : `${Math.abs(dueInMinutes)} min ago`}`;
                inTimeRange = dueInMinutes <= 0 && dueInMinutes > -SYSTEM_SETTINGS.Check_Every_N_Min;
            }
            if (inTimeRange === false) {
                return;
            }
            // If task was completed on time
            if (task.isCompleted === true) {
                if (SYSTEM_SETTINGS.Reward_Successes === true) {
                    Reward_Completed_On_Time(task);
                }
            }
            // If task was not completed on time
            if (task.isCompleted === false) {
                if (SYSTEM_SETTINGS.Punish_Failures === true) {
                    Punish_Incompleted_On_Time(task);
                }
            }
            if (SYSTEM_SETTINGS.Collect_Data === true) {
                // add to database
            }
        });
        if (SYSTEM_SETTINGS.Print_Log === true) {
            if (SYSTEM_SETTINGS.Print_Summary === true) {
                printSummary(log);
            }
            console.log(`< DONE >`);
            console.log("");
        }
    }
    catch (error) {
        console.error(error);
    }
});
