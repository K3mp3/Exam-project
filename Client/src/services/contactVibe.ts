import type { IMessage } from '@/models/IMessage'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function contactVibe(messageData: IMessage) {
  try {
    console.log(messageData)
    const response = await axios.post<IMessage>(`${BASE_URL}/contact/contactVibe`, messageData)

    return response.status
  } catch (error: any) {
    return 500
  }
}
