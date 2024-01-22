export interface IUserContact {
  _id?: string
  customerId?: String
  customerName: string
  customerEmail: string
  repariShopEmail: string
  repairShopName: string
  location: string
  registrationNumber: string
  troubleshootTime: string
  customerMessage: string
  repairShopAnswer: string
  priceOffer: string
  answeredByRepairShop: boolean
  answeredByCustomer: boolean
}
