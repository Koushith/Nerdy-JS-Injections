function getHeadersWithCsrfToken(url) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include', // Include cookies for CSRF token
  })
    .then((response) => {
      const headers = {};
      response.headers.forEach((value, name) => {
        headers[name] = value;
      });
      console.log('All Headers:', headers);

      const csrfToken = headers['X-CSRF-Token'] || headers['csrf-token'] || headers['x-csrf-token'];
      if (csrfToken) {
        console.log('CSRF Token:', csrfToken);
      } else {
        console.log('CSRF Token not found in headers.');
      }

      return headers;
    })
    .catch((error) => {
      console.error('Error fetching headers:', error);
    });
}

getHeadersWithCsrfToken('https://x.com/i/api/1.1/jot/client_event.json');
