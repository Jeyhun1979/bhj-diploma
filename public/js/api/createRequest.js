/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const {
    url = '',
    method = 'GET',
    data = {},
    responseType = 'json',
    callback = () => {}
  } = options;

  const xhr = new XMLHttpRequest();
  let requestData = null;
  let requestUrl = url;

  // Формируем данные для запроса
  if (Object.keys(data).length > 0) {
    if (method === 'GET') {
      const params = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      requestUrl += (requestUrl.includes('?') ? '&' : '?') + params;
    } else {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      requestData = formData;
    }
  }

  xhr.open(method, requestUrl);
  xhr.responseType = responseType;

  xhr.onload = () => {
    callback(null, xhr.response);
  };

  xhr.onerror = () => {
    callback('Network error', null);
  };

  xhr.send(requestData);
};