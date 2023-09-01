import schedule from 'node-schedule';
import { LED } from "./GPIOModule.js";
import { scheduleRules } from '../dicts.js';
// Blink every 10 seconds
const blinkTest = () => {
    const RedLED = new LED(17);
    RedLED.blink();
};
schedule.scheduleJob(scheduleRules.Every10Seconds, blinkTest);
