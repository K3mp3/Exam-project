import axios from 'axios'
import { getAuth } from 'firebase/auth'

const BASE_URL = 'http://localhost:3000'
// https://shark-app-mvsjk.ondigitalocean.app

function cacheUser(user: object, userType: boolean) {
  const chachedData = {
    user,
    userType,
    timestamp: Date.now()
  }

  localStorage.setItem('user', JSON.stringify(chachedData))
}

function loadCachedUser() {
  const cachedJobs = localStorage.getItem('user')
  return cachedJobs ? JSON.parse(cachedJobs) : null
}

function isCachedDataRecent(timestamp: number): boolean {
  const isRecent = Date.now() - timestamp < 1000 * 60 * 60
  console.log('Is cached data recent?', isRecent)
  return isRecent
}

export async function getUser() {
  const auth = getAuth()
  const cachedData = loadCachedUser()

  if (cachedData && isCachedDataRecent(cachedData.timestamp)) {
    console.log('localstorage', cachedData)
    return cachedData
  } else {
    console.log('nej')
    const user = {
      userEmail: auth.currentUser?.email
    }

    const response = await axios.post(`${BASE_URL}/users/signedInUser`, user)
    const userType = response.data.message.repairShop

    cacheUser(user, response.data.message.repairShop)

    console.log('response.data:', response.data)
    console.log('response.data:', response.data.message.repairShop)

    return { userType: userType }
  }
}
