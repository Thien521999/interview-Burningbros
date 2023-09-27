import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    const { config, data, status } = error.response

    const URLS = [`/products`]

    if (URLS.includes(config.url) && (status === 400 || status === 403)) {
      throw new Error(data.message)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
