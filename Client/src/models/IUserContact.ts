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
  customerMessage: string
  repairShopAnswer?: string
  customerAnswer?: string
  priceOffer?: string
}
