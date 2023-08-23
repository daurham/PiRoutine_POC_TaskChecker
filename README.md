# PiRoutine Proof Of Concept: TaskChecker

## Goal: 
- Fetch Todoist tasks from their API every x minutes
- Based on if tasks were completed when they were supposed to, perform a "carrot" or "stick" action


## Setup:
- Create `.env` file and a TODOIST_API_KEY property
- Login to Todoist Developer, generate API key and add it to `.env` file

## Result:
- This POC is passing expectations and will be used in the next iteration of Piroutine