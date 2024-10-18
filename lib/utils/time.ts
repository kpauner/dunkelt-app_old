import { formatDistanceToNow, format, isAfter, subDays } from "date-fns";

// Function to format date as requested using date-fns
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const threeDaysAgo = subDays(new Date(), 3);

  // If less than 3 days ago, return "x days ago"
  if (isAfter(date, threeDaysAgo)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // Otherwise, format as "MMM dd, yyyy"
  return format(date, "MMM dd, yyyy");
}
