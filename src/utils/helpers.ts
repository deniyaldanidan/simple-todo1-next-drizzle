import { format } from "date-fns";

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDateTime(
  dateString: string,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"],
  timeStyle: Intl.DateTimeFormatOptions["timeStyle"]
) {
  const date = new Date(dateString);
  if (isNaN(date.getDate())) {
    return "--";
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle,
    timeStyle,
  }).format(date);
}

export function enhancedDateFNSFormat(
  date: string | Date | number,
  formatter: string,
  emptyInfo?: string
) {
  if (typeof date === "string") {
    date = new Date(date);
    if (isNaN(date.getDate())) {
      return emptyInfo?.length ? emptyInfo : "--";
    }
  } else if (typeof date === "number") {
    date = new Date(date * 1000);
  }
  return format(date, formatter);
}
