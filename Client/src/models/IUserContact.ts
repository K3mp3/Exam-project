export interface IUserContact {
  _id?: string
  customerId?: string
  messageId?: string
  customerName?: string
  customerEmail?: string
  repairShopEmail?: string
  repairShopName?: string
  location: string
  registrationNumber: string
  troubleshootTime: string
  customerMessage: string
  repairShopAnswer?: string
  customerAnswer?: string
  priceOffer?: string
  answeredByRepairShop: boolean
  isLineActive?: boolean
  repairShopAnswers?: { repairShop: string }[]
}
