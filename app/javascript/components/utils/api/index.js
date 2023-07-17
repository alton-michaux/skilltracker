const formatRequestOptions = (data, method = 'GET') => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: data ? JSON.stringify(data) : null,
});

const returnFetchPromise = (url, data, method) => {
  const requestOptions = formatRequestOptions(data, method);
  return fetch(url, requestOptions);
};

export const get = (url) => returnFetchPromise(url);
export const put = (url, data) => returnFetchPromise(url, data, 'PUT');
export const patch = (url, data) => returnFetchPromise(url, data, 'PATCH');
export const post = (url, data) => returnFetchPromise(url, data, 'POST');
export const destroy = (url, data) => returnFetchPromise(url, data, 'DELETE');
