import axios from 'axios'

const TOKEN_KEY = 'opentdb_api-token'

const api = axios.create({
  baseURL: 'https://opentdb.com/'
})

const requestToken = () => {
  axios.get('https://opentdb.com/api_token.php?command=request').then(response => {
    const { token } = response.data

    localStorage.setItem(TOKEN_KEY, token)

    axios.defaults.headers.common.Authorization = token
  })
}

if (localStorage.getItem(TOKEN_KEY) === null) {
  requestToken()
} else {
  axios.defaults.headers.common.Authorization = localStorage.getItem(TOKEN_KEY)
}

export default api
