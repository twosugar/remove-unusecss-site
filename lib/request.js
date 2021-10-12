const env = process.env.NODE_ENV == "development" ? 'dev' : 'prod'

const hostMap = {
  prod: 'http://sugarfish.top:3001/',
  dev: 'http://localhost:3001/'
}

export const post = (url) => {
  let host;
  if (process.browser) {
    host = window.location.origin
  } else {
    host = hostMap[env]
  }
  // return
  return fetch(`${host}/${url}`)
    .then(response => {
      return response.json();
    })

}