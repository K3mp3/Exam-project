import { signInUser } from '@/services/signInUser'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'

interface AuthState {
  user: { email: string; uid: string } | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async customSignIn(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const response = await signInUser({ email, password, signedIn: true })
        if (response === 201) {
          const auth = getAuth()
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const { email: userEmail, uid } = userCredential.user
          this.user = { email: userEmail!, uid } // email should never be null after successful sign-in
          this.loading = false
          return this.user
        } else {
          this.loading = false
          throw new Error('Custom sign-in failed')
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message
        } else {
          this.error = 'An unknown error occurred'
        }
        this.loading = false
        throw error
      }
    },
    signOut() {
      const auth = getAuth()
      auth.signOut().then(() => {
        this.user = null
      })
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  persist: true // Enable persistence
})
