export function timeAgo(dateString) {
  const date = new Date(dateString);
  const time = date.getTime();
  const seconds = (Date.now() - time) / 1000;
  if (seconds < 60) {
    return plural(seconds, 'second');
  } else if (seconds < 3600) {
    return plural(seconds / 60, 'minute');
  } else if (seconds < 3600 * 24) {
    return plural(seconds / 3600, 'hour');
  } else {
    return plural(seconds / 3600 / 24, 'day');
  }
}

function plural(count, one) {
  count = Math.floor(count);
  const units = count === 1 ? one : one + 's';
  return `${count} ${units} ago`;
}

export function copyToClipboard(text) {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
