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
  customerMessage: {
    work: string
    message: string
    type: string
  }[]
  repairShopAnswer?: string
  customerAnswer?: string
  priceOffer?: string
  answeredByRepairShop: boolean
  isLineActive?: boolean
  repairShopAnswers?: { repairShop: string }[]
}
