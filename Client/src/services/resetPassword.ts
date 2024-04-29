import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function resetPassword(user: object) {
  try {
    console.log(user)

    const response = await axios.post(`${BASE_URL}/users/resetPassword`, user)

    const data = response.data
    const status = response.status

    return { data, status }
  } catch (error) {
    return error
  }
}
