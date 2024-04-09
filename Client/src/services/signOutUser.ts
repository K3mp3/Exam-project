import type { IUserSignIn } from '@/models/IUserSignIn'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

export async function signOutUser(user: IUserSignIn) {
  try {
    const response = await axios.post(`${BASE_URL}/users/signOutUser`, user)
    return response.status
  } catch (error: any) {
    if (
      error &&
      error.response.status === 500 &&
      error.response.data.message === 'Internal Server Error'
    ) {
      const showErrorDialog = useShowPopUp()
      showErrorDialog.showPopUpTab(
        true,
        'Whoops, tyvärr fungerade det inte att logga ut på grund av ett fel. Om problemet kvarstår, vänligen kontakta support på 060-123 47 53'
      )
    }
  }
}
