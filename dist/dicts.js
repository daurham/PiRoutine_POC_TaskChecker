export const scheduleRules = {
    Every10Seconds: '*/10 * * * * *',
    Every5Minutes: '*/5 * * * *',
    Every1Minute: '*/1 * * * *',
    EveryMidnight: '0 0 * * *',
    'Every6:00PM': '0 18 * * *',
    'Every7:10PM': '10 19 * * *',
    'Every7:30PM': '30 19 * * *',
    'Every7:59PM': '59 19 * * *',
    'Every8:00PM': '0 20 * * *',
    'Every8:20PM': '40 20 * * *',
    'Every8:45PM': '45 20 * * *',
    convertToCronSyntax(timeString) {
        const timeComponents = timeString.match(/(\d+):(\d+)([APMapm]{2})/);
        if (!timeComponents) {
            throw new Error('Invalid time format. Please use "hh:mmAM/PM".');
        }
        const hour = parseInt(timeComponents[1]);
        const minute = parseInt(timeComponents[2]);
        const ampm = timeComponents[3].toLowerCase();
        if (hour < 1 || hour > 12 || minute < 0 || minute > 59 || (ampm !== 'am' && ampm !== 'pm')) {
            throw new Error('Invalid time components.');
        }
        const cronHour = ampm === 'pm' ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
        return `${minute} ${cronHour} * * *`;
    }
};
export const ErrorMessage = {
    TASK_FETCHING_ERROR: "Error fetching high priority tasks.",
    TODOIST_API_KEY_NOT_SET: 'TODOIST_API_KEY environment variable is not set.',
};
