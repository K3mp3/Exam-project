import type { IUserRegistration } from '@/models/IUserRegistration'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import axios from 'axios'

const BASE_URL = 'https://shark-app-mvsjk.ondigitalocean.app'

export async function registerUser(user: IUserRegistration) {
  try {
    const response = await axios.post<IUserRegistration>(`${BASE_URL}/users/createUser`, user)
    console.log(response)
    return response.data
  } catch (error: any) {
    console.log('Error in registration:', error)
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'Email is already in use!'
    ) {
      const showErrorPopUp = useShowPopUp()
      showErrorPopUp.showPopUpTab(
        true,
        'Whoops, ser ut som att email adressen redan används. Vänligen logga in om du redan har ett konto'
      )
    } else {
      return error
    }
  }
}

export async function registerRepairShop(user: IUserRegistration) {
  try {
    const response = await axios.post<IUserRegistration>(
      `${BASE_URL}/users/createRepairShopUser`,
      user
    )
    return response.data
  } catch (error: any) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === 'Email is already in use!'
    ) {
      const showErrorPopUp = useShowPopUp()
      showErrorPopUp.showPopUpTab(
        true,
        'Whoops, ser ut som att email adressen redan används. Vänligen logga in om du redan har ett konto'
      )
    } else {
      return error
    }
  }
}
