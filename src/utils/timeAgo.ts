export function timeAgo(timestamp: number): string {
  const timeDiff = Date.now() / 1000 - timestamp;

  const seconds = timeDiff;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365.25; // Approximate value for average days in a year, considering leap years

  if (years >= 1) {
    return `${Math.floor(years)}y ago`;
  } else if (days >= 1) {
    return `${Math.floor(days)}d ago`;
  } else if (hours >= 1) {
    return `${Math.floor(hours)}h ago`;
  } else if (minutes >= 1) {
    return `${Math.floor(minutes)}m ago`;
  } else {
    return `${Math.floor(seconds)}s ago`;
  }
}
