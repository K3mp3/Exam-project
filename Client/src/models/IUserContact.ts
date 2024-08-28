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
    id: string
    work: string
    message: string
    type: string
    answeredByRepairShop: boolean
  }[]
  repairShopAnswer?: string
  customerAnswer?: string
  priceOffer?: string
  isLineActive?: boolean
  repairShopAnswers?: { repairShop: string }[]
}
