import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

describe('checkInputData', () => {
  it('enables the button when all inputs are valid and match their confirmations', () => {
    const isBtnDisabled = ref(true)
    const isEmailMatch = ref(true)
    const isNameCorrect = ref(true)
    const isPasswordMatch = ref(true)
    const inputsArray = [
      { key: 'isName', value: true },
      { key: 'isEmail', value: true },
      { key: 'isConfirmEmail', value: true },
      { key: 'isPassword', value: true },
      { key: 'isConfirmPassword', value: true }
    ]

    checkInputData()
    expect(isBtnDisabled.value).toBe(false)
  })
})
