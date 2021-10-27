import axios from 'axios'

// create a new axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 300000,
  withCredentials: true
})

instance.baseURL = 'http://localhost:8080/';
instance.withCredentials = true;

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
 // window.theApp.setIsLoading(true)
  return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
 // window.theApp.setIsLoading(false)
  return response
},
error => {
  //window.theApp.setIsLoading(false)
  console.log("The error: ");
  throw error
})

export default instance