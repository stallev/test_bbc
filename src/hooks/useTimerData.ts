import { UtcTimezoneShiftValue, MillisecondsCount } from "@/constants/TimerData";

export interface EventTimerData {
  start: {
    daysCount: number
    hoursCount: number
    minutesCount: number
    secondsCount: number
    totalMillisecondsCount: number
  }
  end: {
    daysCount: number
    hoursCount: number
    minutesCount: number
    secondsCount: number
    totalMillisecondsCount: number
  }
  eventName: string
}

export interface EventData {
  eventName: string
  totalMillisecondsCount: {
    startServiceTimeDifference: number
    endServiceTimeDifference: number
  },
}

export interface HourMinutesData {
  hour: number
  minutes: number
}

export interface EventParameterProps {
  eventName: string
  timeHours: number
  durationTime: HourMinutesData
  dayOfWeek: number
}

const convertMillisecondsToTime = (totalMillisecondsCount: number) => {
  const millisecondsInSecond = 1000;
  const secondsInMinute = 60;
  const minutesInHour = 60;
  const hoursInDay = 24;
  
  const totalSeconds = Math.floor(totalMillisecondsCount / millisecondsInSecond);
  const daysCount = Math.floor(totalSeconds / (secondsInMinute * minutesInHour * hoursInDay));
  const remainingSeconds = totalSeconds % (secondsInMinute * minutesInHour * hoursInDay);
  
  const hoursCount = Math.floor(remainingSeconds / (secondsInMinute * minutesInHour));
  const remainingSecondsAfterHours = remainingSeconds % (secondsInMinute * minutesInHour);
  
  const minutesCount = Math.floor(remainingSecondsAfterHours / secondsInMinute);
  const secondsCount = remainingSecondsAfterHours % secondsInMinute;

  return {
    daysCount,
    hoursCount,
    minutesCount,
    secondsCount
  }
}

export const convertMillisecondsToTimeData = (event: EventData):EventTimerData => {
  const eventStartTimeData = {
    ...convertMillisecondsToTime(event.totalMillisecondsCount.startServiceTimeDifference),
    totalMillisecondsCount: event.totalMillisecondsCount.startServiceTimeDifference,
  }

  const eventEndTimeData = {
    ...convertMillisecondsToTime(event.totalMillisecondsCount.endServiceTimeDifference),
    totalMillisecondsCount: event.totalMillisecondsCount.endServiceTimeDifference,
  }
  
  return {
    start: eventStartTimeData,
    end: eventEndTimeData,
    eventName: event.eventName,
  };
}

export const getServiceTimeDifference = (event: EventParameterProps):EventData => {
  const eventDurationMillisecondsCount = (event.durationTime.hour * MillisecondsCount.inHour)
    + (event.durationTime.minutes * MillisecondsCount.inMinute);
  const currentTime = new Date();
  const todayStartTimeMark = (new Date).setHours(0, 0, 0, 0)
  const currentTimeMark = new Date().getTime();
  const dayOfWeek = currentTime.getDay();

  const offsetInHours = currentTime.getTimezoneOffset() / 60;
  const pacificOffset = (UtcTimezoneShiftValue - offsetInHours); // для стандартного времени Тихоокеанского часового пояса

  let addedDaysCount = 0;

  if(dayOfWeek < event.dayOfWeek) {
    addedDaysCount = event.dayOfWeek - dayOfWeek;
  }

  if(dayOfWeek > event.dayOfWeek) {
    addedDaysCount = 7 - (dayOfWeek - event.dayOfWeek);
  }

  if(dayOfWeek === event.dayOfWeek) {
    addedDaysCount = 0;
  }

  const addedMillisecondsCount = (addedDaysCount * MillisecondsCount.inDay)
    + (event.timeHours * MillisecondsCount.inHour)
    + eventDurationMillisecondsCount
    + (pacificOffset * MillisecondsCount.inHour);

  const assumedDifferenceEndTimeMark = (todayStartTimeMark + addedMillisecondsCount) - currentTimeMark;

  const differenceEndTimeMark = assumedDifferenceEndTimeMark > 0
    ? assumedDifferenceEndTimeMark
    : MillisecondsCount.inWeek + assumedDifferenceEndTimeMark;

  const startServiceTimeDifference = differenceEndTimeMark - eventDurationMillisecondsCount;
  const endServiceTimeDifference = differenceEndTimeMark;

  return {
    eventName: event.eventName,
    totalMillisecondsCount: {
      startServiceTimeDifference,
      endServiceTimeDifference,
    },
  };
}
