const env = process.env.NODE_ENV == "development" ? 'dev' : 'prod'

const hostMap = {
  prod: 'http://sugarfish.top:3002',
  dev: 'http://localhost:3002'
}

export const post = (url, params = {}) => {
  let host;
  if (process.browser) {
    host = window.location.origin
  } else {
    host = hostMap[env]
  }
  // return
  return fetch(`${host}${url}`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
    .then(response => {
      return response.json();
    })
}