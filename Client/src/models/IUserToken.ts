export interface IUserToken {
  name?: string
  email: string
  magicToken: string
  repairShop?: boolean
  signedIn?: boolean
  userId?: string
}
