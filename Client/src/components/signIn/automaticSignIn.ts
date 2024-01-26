import { automaticSignIn } from '@/services/signInUser'

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const userEmail = getCookie('email')

const user = {
  email: userEmail || ''
}

export async function handleAutomaticSignIn() {
  if (userEmail != '') {
    const response = await automaticSignIn(user)

    console.log('response:', response)

    if (response === 201) {
      return true
    }
  } else {
    return false
  }
}
