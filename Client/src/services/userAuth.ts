import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function controllUserAuth(user: object) {
  try {
    const response = await axios.post(`${BASE_URL}/users/userAuth`, user)

    return response.status
  } catch (error: any) {
    return error.response.status
  }
}
