<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mobile = ref(true)
const tablet = ref(false)
const desktop = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  console.log(width)

  if (width > 1481) {
    desktop.value = true
    tablet.value = false
    mobile.value = false
  }

  if (width > 699 && width < 1482) {
    tablet.value = true
    desktop.value = false
    mobile.value = false
  }

  if (width < 700) {
    mobile.value = true
    desktop.value = false
    tablet.value = false
  }

  //   if (width < 1482) {
  //     tablet.value = true
  //     desktop.value = false
  //   } else if (width < 700) {
  //     mobile.value = true
  //     tablet.value = false
  //     desktop.value = false
  //   } else {
  //     mobile.value = false
  //     tablet.value = true
  //   }
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <div class="contact-form-container">
    <div class="contact-form-nav-container">
      <RouterLink to="/" class="contact-form-back-router-link"
        ><fontAwesome :icon="['fas', 'chevron-left']"
      /></RouterLink>
      <h2
        :class="{
          'font-title-bold O14rem': mobile,
          'font-title-bold O15rem': tablet,
          'font-title-bold O16rem': desktop
        }"
      >
        Kontakta oss
      </h2>
    </div>
    <form class="contact-form">
      <div class="contact-form-right-side">
        <label for="name">För- och efternamn</label>
        <input
          type="text"
          name="name"
          placeholder="Förnamn & efternamn"
          v-model="registrationNumber"
          @change="checkInputDataRegistrationNumber"
          @input="formatRegistrationNumber"
          class="contact-form-text-input"
        />

        <label for="email">Email adress</label>
        <input
          type="email"
          name="name"
          placeholder="namn@mail.se"
          v-model="registrationNumber"
          @change="checkInputDataRegistrationNumber"
          @input="formatRegistrationNumber"
          class="contact-form-text-input"
        />

        <button
          v-if="tablet || desktop"
          type="submit"
          :disabled="isBtnDisabled"
          :class="{
            'contact-form-send-btn-disabled': isBtnDisabled,
            'contact-form-send-btn': !isBtnDisabled,
            hidden: hideMobileBtn
          }"
        >
          Skicka
        </button>
      </div>

      <div class="contact-form-left-side">
        <label for="message-input">Meddelande</label>
        <textarea
          name="message-input"
          v-model="message"
          placeholder="Beskriv varför du kontaktar oss"
          @input="checkInputDataMessage"
          class="contact-form-textarea-input"
        ></textarea>
      </div>

      <button
        v-if="mobile"
        type="submit"
        :disabled="isBtnDisabled"
        :class="{
          'contact-form-send-btn-disabled': isBtnDisabled,
          'contact-form-send-btn': !isBtnDisabled,
          hidden: hideMobileBtn
        }"
      >
        Skicka
      </button>
    </form>
  </div>
  <div
    :class="{
      'blue-line-mb-32': mobile,
      'blue-line-mb-64': tablet || desktop
    }"
  ></div>
</template>
