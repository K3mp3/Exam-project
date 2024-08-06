import type { IUserSignIn } from '@/models/IUserSignIn'
import type { IUserToken } from '@/models/IUserToken'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import axios from 'axios'
import { computed } from 'vue'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

let userId = ''

export async function signInUser(user: IUserSignIn) {
  try {
    const response = await axios.post<IUserSignIn>(`${BASE_URL}/users/signin`, user)

    console.log(response)

    userId = response.data.id || ''

    const data = response.data
    const status = response.status

    console.log(response)

    return response.status
  } catch (error: any) {
    const showErrorDialog = useShowPopUp()
    const data = error.response.data
    const status = !!error.response.status

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Wrong email or password!'
    ) {
      return { data, status }
    } else if (error.response && error.response.status === 500) {
      showErrorDialog.showPopUpTab(
        true,
        'Whoops, tyvärr fungerade inte inloggningen på grund av ett fel. Vänligen försök igen eller vänta en liten stund.'
      )
      if (error.response.data.message === 'Payment not done')
        showErrorDialog.showPopUpTab(true, 'Vänligen betala för att aktivera ditt konto')
      window.location = error.response.data.url as Location | (string & Location)
      return { data, status }
    }
  }
}

export async function checkMagicToken(user: IUserToken) {
  try {
    const response = await axios.post<IUserToken>(`${BASE_URL}/users/checkMagicToken`, user)

    if (response.data.signedIn) {
      const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)
      const showSignInDialog = useShowSignInDialog()
      showSignInDialog.showSignInDialogForm(!isSignIn.value)

      localStorage.setItem('userEmail', response.data.email || '')
      localStorage.setItem('userName', response.data.name || '')
      localStorage.setItem('isRepairShop', String(response.data.repairShop ?? ''))
      localStorage.setItem('isSignedIn', true.toString())
      localStorage.setItem('user', response.data.userId ? response.data.userId : '')

      return {
        name: response.data.name,
        repairShop: response.data.repairShop,
        status: response.status,
        userId: userId
      }
    } else {
      const showErrorDialog = useShowPopUp()
      showErrorDialog.showPopUpTab(
        true,
        'Whoops, tyvärr fungerade inte inloggningen på grund av ett fel. Vänligen försök igen eller vänta en liten stund.'
      )
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
