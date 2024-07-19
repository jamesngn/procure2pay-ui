import dayjs from "dayjs";

type TDateFormat =
  | "DD/MM/YYYY"
  | "YYYY-MM-DD"
  | "HH:mm:ss DD/MM/YYYY"
  | "YYYY-MM-DDT00:00:00";
const DEFAULT_DATE_FORMAT: TDateFormat = "DD/MM/YYYY";

// Function to format a date
export function formatDate(
  date: Date | string,
  format: TDateFormat = DEFAULT_DATE_FORMAT
): string {
  try {
    if (!date) return "";

    return dayjs(date).format(format);
  } catch (error) {
    return "";
  }
}

// Function to get the current date
export function getCurrentDate(
  format: TDateFormat = DEFAULT_DATE_FORMAT
): string {
  return dayjs().format(format);
}

// Function to add days to a given date
export function addDays(date: Date | string, days: number): string {
  return dayjs(date).add(days, "day").format("YYYY-MM-DD");
}

// Function to subtract days from a given date
export function subtractDays(date: Date | string, days: number): string {
  return dayjs(date).subtract(days, "day").format(DEFAULT_DATE_FORMAT);
}

// Function to check if a date is in the past
export function isPastDate(date: Date | string): boolean {
  return dayjs(date).isBefore(dayjs());
}

// Function to check if a date is in the future
export function isFutureDate(date: Date | string): boolean {
  return dayjs(date).isAfter(dayjs());
}

// Function to calculate the difference in days between two dates
export function getDaysDifference(
  date1: Date | string,
  date2: Date | string
): number {
  const start = dayjs(date1);
  const end = dayjs(date2);
  return end.diff(start, "day");
}

// Function to get the day of the week for a given date
export function getDayOfWeek(date: Date | string): string {
  return dayjs(date).format("dddd");
}

// Function to check if two dates are equal
export function areDatesEqual(
  date1: Date | string,
  date2: Date | string
): boolean {
  return dayjs(date1).isSame(dayjs(date2));
}
