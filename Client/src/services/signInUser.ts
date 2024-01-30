import type { IUserSignIn } from '@/models/IUserSignIn'
import type { IUserToken } from '@/models/IUserToken'
import { useShowPopUp } from '@/stores/ShowPopUpStore'
import { useShowMagicTokenDialog } from '@/stores/showMagicTokenDialog'
import { useShowSignInDialog } from '@/stores/showSignInDialog'
import { useSignInStore } from '@/stores/signInStore'
import axios from 'axios'
import { computed } from 'vue'

const BASE_URL = 'http://localhost:3000'
const isDialog = computed(() => useShowPopUp().showPopUp)

export async function signInUser(user: IUserSignIn) {
  try {
    console.log(user)
    const response = await axios.post<IUserSignIn>(`${BASE_URL}/users/signin`, user)

    const showMagicTokenDialog = useShowMagicTokenDialog()
    showMagicTokenDialog.showMagicTokenInput(true, response.data.email)

    return response.data
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
    console.log(response.status)
    return response.status
  } catch (error) {
    console.log(error)
  }
}

export async function checkMagicToken(user: IUserToken) {
  try {
    const response = await axios.post<IUserToken>(`${BASE_URL}/users/checkMagicToken`, user)
    console.log('response.data.signedIn:', response.data.signedIn)

    if (response.data.signedIn) {
      const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)
      const showSignInDialog = useShowSignInDialog()
      showSignInDialog.showSignInDialogForm(!isSignIn.value)

      const isSignedIn = useSignInStore()
      isSignedIn.signInUser(true)

      return {
        name: response.data.name,
        repairShop: response.data.repairShop,
        status: response.status
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

export async function signOutUser(user: IUserSignIn) {
  try {
    console.log('user:', user)
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
