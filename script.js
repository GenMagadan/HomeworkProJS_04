import { trainingSchedule } from './data.js';

// const scheduleInfo = JSON.parse(trainingSchedule);
// console.log(scheduleInfo);

const schedule = 'schedule';
if (!localStorage.getItem(schedule)) {
  localStorage.setItem(schedule, trainingSchedule);
}
