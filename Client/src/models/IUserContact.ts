import type { IMessage } from './IMessage'

export interface IUserContact {
  _id?: string
  customerId?: String
  customerName: string
  customerEmail: string
  repairShopEmail?: string
  repairShopName?: string
  location: string
  registrationNumber: string
  troubleshootTime: string
  customerMessage: IMessage[]
  repairShopAnswer?: string
  customerAnswer?: string
  priceOffer?: string
  answeredByRepairShop: boolean
  answeredByCustomer: boolean
}
