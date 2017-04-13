import {timeAgo} from '../utils';

describe('utils', () => {
  it('formats time', () => {
    const check = (seconds, expected) => {
      const now = Date.now();
      const dateStr = new Date(now - seconds * 1000).toISOString();
      expect(timeAgo(dateStr)).toEqual(expected);
    };
    check(0, '0 seconds ago');
    check(1, '1 second ago');
    check(2, '2 seconds ago');
    check(60, '1 minute ago');
    check(120, '2 minutes ago');
    check(3600, '1 hour ago');
    check(3600 * 2, '2 hours ago');
    check(3600 * 24, '1 day ago');
    check(3600 * 24 * 2, '2 days ago');
  });
});
