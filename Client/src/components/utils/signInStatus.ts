export function getSignInStatus() {
  const isSignedIn = localStorage.getItem('isSignedIn')

  return isSignedIn
}
