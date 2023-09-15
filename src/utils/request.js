import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export const postRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(response => {
      resolve(response.data)
    }, error => {
      reject(error)
    })
  })
}
