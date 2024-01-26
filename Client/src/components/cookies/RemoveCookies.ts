export function removeCookies() {
  const pastExpirationDate = new Date(0).toUTCString

  document.cookie = `name=; expires=${pastExpirationDate}; path=""`
  document.cookie = `email=; expires=${pastExpirationDate}; path=""`
  document.cookie = `repairShop=; expires=${pastExpirationDate}; path=""`
}
