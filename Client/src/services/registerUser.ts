import type { IUserRegistration } from '@/models/IUserRegistration'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function registerUser(user: IUserRegistration) {
  try {
    const response = await axios.post<IUserRegistration>(`${BASE_URL}/users/createUser`, user)
    return response.status
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

export async function registerRepairShop(user: IUserRegistration) {
  try {
    const response = await axios.post<IUserRegistration>(
      `${BASE_URL}/users/createRepairShopUser`,
      user
    )

    window.location = process.env.PRICE_KEY as Location | (string & Location)

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
