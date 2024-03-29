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

export async function handleAutomaticSignIn() {
  const userEmail = getCookie('email') || ''
  if (userEmail) {
    const response = await automaticSignIn({ email: userEmail })

    const signInResponse = response as { status: number; userId: string }

    if (signInResponse?.status === 201) {
      return {
        signIn: true,
        id: signInResponse.userId
      }
    }
  }
  return { signIn: false, id: null }
}
