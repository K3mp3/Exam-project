import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function removeUserRequest(requestData: object) {
  try {
    console.log(requestData)
    const response = await axios.post<Object>(`${BASE_URL}/remove/removeUserRequest`, requestData)

    return response.data
  } catch (error) {
    return error
  }
}
