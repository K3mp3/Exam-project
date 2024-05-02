import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function forgotPasswordService(user: object) {
  try {
    console.log(user)

    const response = await axios.post(`${BASE_URL}/users/forgotPassword`, user)

    return {
      data: response.data,
      status: response.status
    }
  } catch (error) {
    return error
  }
}
