import type { IUserSignIn } from '@/models/IUserSignIn'
import type { IUserToken } from '@/models/IUserToken'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { useSignInStore } from '@/stores/signInStore'
import axios from 'axios'
import { computed } from 'vue'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

const isDialog = computed(() => useShowPopUp().showPopUp)

let userId = ''

export async function signInUser(user: IUserSignIn) {
  try {
    const response = await axios.post<IUserSignIn>(`${BASE_URL}/users/signin`, user)

    const showMagicTokenDialog = useShowMagicTokenDialog()
    showMagicTokenDialog.showMagicTokenInput(true, response.data.email, response.data.id)

    userId = response.data.id || ''

    console.log(response.data.name)
  } catch (error: any) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Wrong email or password!'
    ) {
      return error.response.data.message
    } else if (error.response && error.response.status === 500) {
      const showErrorDialog = useShowPopUp()
      showErrorDialog.showPopUpTab(
        true,
        'Whoops, tyvärr fungerade inte inloggningen på grund av ett fel. Vänligen försök igen eller vänta en liten stund.'
      )
    }
  }
}

export async function automaticSignIn(user: IUserSignIn) {
  try {
    const response = await axios.post<IUserSignIn>(`${BASE_URL}/users/automaticSignIn`, user)
    return {
      status: response.status,
      userId: response.data.id
    }
  } catch (error) {
    return error
  }
}

export async function checkMagicToken(user: IUserToken) {
  try {
    const response = await axios.post<IUserToken>(`${BASE_URL}/users/checkMagicToken`, user)

    if (response.data.signedIn) {
      const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)
      const showSignInDialog = useShowSignInDialog()
      showSignInDialog.showSignInDialogForm(!isSignIn.value)

      const isSignedIn = useSignInStore()
      isSignedIn.signInUser(true)

      console.log(response.data.repairShop)

      localStorage.setItem('userEmail', response.data.email || '')
      localStorage.setItem('userName', response.data.name || '')
      localStorage.setItem('isRepairShop', String(response.data.repairShop ?? ''))

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
