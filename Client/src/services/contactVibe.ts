import type { IMessage } from '@/models/IMessage'
import axios from 'axios'

const BASE_URL = 'https://shark-app-mvsjk.ondigitalocean.app'

export async function contactVibe(messageData: IMessage) {
  try {
    const response = await axios.post<IMessage>(`${BASE_URL}/contact/contactVibe`, messageData)

    return response.status
  } catch (error: any) {
    return 500
  }
}
