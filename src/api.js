const HOST = '/';

function doFetch(path, init) {
  return fetch(HOST + path, {
    headers: {'Content-Type': 'application/json'},
    ...init,
  }).then(res => {
    if (!res.ok) {
      throw new Error('Server error');
    }
    return res.json();
  });
}

export function shorten(url) {
  const body = JSON.stringify({url});
  const fetchPromise = doFetch('shorten', {
    method: 'POST',
    body,
  });

  const cancelPromise = new Promise((rs, rj) => {
    setTimeout(() => rj(new Error('Request timeout')), 5000);
  });

  return Promise.race([fetchPromise, cancelPromise]);
}

export function stats(code) {
  if (Math.random() < 0.1) {
    return Promise.reject(null);
  }
  return doFetch(`${code}/stats`);
}

/*
 * Retrieve stats for an array of codes. Returns stats as a code-stats map. For
 * failed requests stats are not included in the map.
 */
export async function statsAll(codes) {
  const allStats = await Promise.all(
    codes.map(code => stats(code).catch(err => null)),
  );
  return allStats.reduce(
    (map, stats, i) => {
      if (stats) {
        map[codes[i]] = stats;
      }
      return map;
    },
    {},
  );
}
