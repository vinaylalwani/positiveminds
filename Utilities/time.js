import dayjs from 'dayjs';

export function utcTolocalTime(t) {
  return new Date(t).toLocaleString();
}

export function formatToTimeHourMin(t) {
  return dayjs(t).format('h:mm a');
}
