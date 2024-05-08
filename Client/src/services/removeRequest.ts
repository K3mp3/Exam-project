import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function removeUserRequest(removeData: object) {
  try {
    const response = await axios.post(`${BASE_URL}/remove/removeUserRequest`, removeData)

    return response.data
  } catch (error) {
    return error
  }
}
