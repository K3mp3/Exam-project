import type { IUserSignIn } from '@/models/IUserSignIn'
import type { IUserToken } from '@/models/IUserToken'
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function signInUser(user: IUserSignIn) {
  try {
    console.log(user)
    const response = await axios.post<IUserSignIn>(`${BASE_URL}/users/signIn`, user)

    const showMagicTokenDialog = useShowMagicTokenDialog()
    showMagicTokenDialog.showMagicTokenInput(true, response.data.email)

    return response.data
  } catch (error: any) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'Wrong email or password!'
    ) {
      return error.response.data.message
    }
  }
}

export async function checkMagicToken(user: IUserToken) {
  try {
    const response = await axios.post<IUserToken>(`${BASE_URL}/users/checkMagicToken`, user)
    console.log(response.data.repairShop)
    return {
      name: response.data.name,
      repairShop: response.data.repairShop,
      status: response.status
    }
  } catch (error: any) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'Unauthorized'
    ) {
      return error.response.data.message
    }
  }
}
