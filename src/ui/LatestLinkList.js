import React from 'react';

import {API_URL} from '../config';
import {copyToClipboard, timeAgo} from '../utils';

import './LatestLinkList.css';

function css(...args) {
  return args.map(suffix => 'LatestLinkList-' + suffix).join(' ');
}

function revMap(arr, fn) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(fn(arr[i]));
  }
  return result;
}

function LatestLinkList(props) {
  return (
    <table className="LatestLinkList">
      <tbody>
        <tr>
          <th className={css('th', 'th-first')}>Link</th>
          <th className={css('th')}>Visits</th>
          <th className={css('th')}>Last Visited</th>
        </tr>
        {revMap(props.links, link => renderRow(link, props.newCode))}
      </tbody>
    </table>
  );
}

function renderRow(link, newCode) {
  return (
    <tr key={link.shortcode} className={css('tr')}>
      <td className={css('td', 'td-first')}>
        {link.shortcode === newCode && <div className={css('new')} />}
        <div>
          <a href={`${API_URL}/${link.shortcode}`} className={css('link')}>
            shooooort.com/
            <span className={css('code')}>{link.shortcode}</span>
          </a>
          <a
            href="javascript:"
            className={css('copy')}
            onClick={() => copyToClipboard(`${API_URL}/${link.shortcode}`)}
          >
            Copy this link
          </a>
        </div>
        <div className={css('url')}>{link.url}</div>
      </td>
      <td className={css('td')}>{link.redirectCount}</td>
      <td className={css('td', 'td-date')}>{timeAgo(link.lastSeenDate)}</td>
    </tr>
  );
}

export default LatestLinkList;
