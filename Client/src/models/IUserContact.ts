export interface IUserContact {
  _id?: string
  customerId?: string
  email: string
  messageId?: string
  customerName?: string
  customerEmail?: string
  repairShopEmail?: string
  repairShopName?: string
  location: string
  registrationNumber: string
  troubleshootTime: string
  customerMessage: {
    work: string
    message: string
    type: string
    date: Date
    name: string
  }[]
  repairShopAnswer?: string
  customerAnswer?: string
  priceOffer?: string
  answeredByRepairShop: boolean
  isLineActive?: boolean
  repairShopAnswers?: { repairShop: string }[]
}
