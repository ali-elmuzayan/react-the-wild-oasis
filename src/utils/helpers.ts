// Utility functions for date manipulation and formatting
import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// Options interface for getToday function
interface GetTodayOptions {
  end?: boolean; // If true, sets time to end of day (23:59:59), otherwise start of day (00:00:00)
}

/**
 * Calculates the difference in days between two dates
 * Works with both Date objects and strings (from Supabase)
 * @param dateStr1 - First date (string or Date object)
 * @param dateStr2 - Second date (string or Date object)
 * @returns Number of days between the two dates
 */
export const subtractDates = (
  dateStr1: string | Date,
  dateStr2: string | Date
): number =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

/**
 * Formats a date string to show relative time from now
 * Example: "2 days ago", "3 hours ago"
 * @param dateStr - ISO date string to format
 * @returns Formatted relative time string
 */
export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true, // Adds "ago" to the end
  })
    .replace("about ", "") // Remove "about" for cleaner text
    .replace("in", "In"); // Capitalize "In" for better formatting

/**
 * Gets today's date as an ISO string with consistent time
 * Supabase needs ISO strings, but they change on every render due to milliseconds
 * This function ensures consistent time for comparisons
 * @param options - Optional configuration for start/end of day
 * @returns ISO string representation of today's date
 */
export const getToday = function (options: GetTodayOptions = {}): string {
  const today = new Date();

  // Set time to either start or end of day for consistent comparisons
  if (options?.end)
    // Set to the last second of the day (23:59:59.999)
    today.setUTCHours(23, 59, 59, 999);
  // Set to the start of the day (00:00:00.000)
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

/**
 * Formats a number as USD currency
 * @param value - Number to format as currency
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
