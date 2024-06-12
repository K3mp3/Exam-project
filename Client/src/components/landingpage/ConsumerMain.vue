<script setup lang="ts">
import { useShowUserEmail } from '@/stores/showUserEmail'
import { onMounted, ref } from 'vue'
import car from '../../../public/assets/car.svg'
import keyboard from '../../../public/assets/keyboard.svg'
import person from '../../../public/assets/person.svg'
import FaqParent from '../FAQ/FaqParent.vue'
import GraphVisual from '../graph/GraphVisual.vue'

const userEmail = ref('')
const desktopView = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 1482) {
    desktopView.value = false
  } else {
    desktopView.value = true
  }
}

function saveUserEmail() {
  if (userEmail.value === '') {
    return
  } else {
    const writtenEmail = useShowUserEmail()
    writtenEmail.useUserEmail(userEmail.value, true)
  }
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <div class="py-16 px-4">
    <div class="flex flex-col gap-16 xl:gap-32 text-main">
      <div class="text-parent-container top-container flex flex-col gap-3 xl:gap-4 sm:text-center">
        <h2 class="text-xl sm:text-2xl">Varför borde du använda vår tjänst?</h2>
        <ul class="flex flex-col gap-2 xl:flex-row justify-center xl:gap-16">
          <li><span>&#x2022; Smidigt - </span>Allt sammlat på ett ställe</li>
          <li><span>&#x2022; Kostnadsfritt - </span>Tjänsten är helt gratis att använda</li>
          <li>
            <span>&#x2022; Ekonomiskt - </span>Du sparar pengar genom att välja det billigaste
            erbjudanet
          </li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col gap-8 mt-2 sm:items-center">
          <div class="flex flex-col gap-1 sm:items-center">
            <img :src="car" class="w-5 sm:w-6" />
            <h2 class="text-xl sm:text-2xl">1. Skapa ett konto</h2>
            <p class="mb-4">Fyll i dina uppgifter för att skapa ett konto</p>
            <RouterLink to="register" class="outline-btn px-8 py-2 max-w-[210px]"
              >Skapa konto</RouterLink
            >
          </div>
          <div class="flex flex-col gap-1 mt-2 sm:items-center sm:text-center max-w-[316px]">
            <img :src="keyboard" class="w-5 sm:w-6" />
            <h2 class="text-xl sm:text-2xl">2. Kontakta verkstäder</h2>
            <p>
              Skriv lite kort info om vad som är fel på bilen. Skicka sedan det till olika
              verkstäder
            </p>
          </div>
          <div class="flex flex-col gap-1 sm:items-center sm:text-center max-w-[316px]">
            <img :src="person" class="w-5 sm:w-6" />
            <h2 class="text-xl sm:text-2xl">3. Få svar</h2>
            <p>Sedan får du svar i din inkorg från olika verkstäder</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="graph-parent-container px-4 sm:px-8">
    <GraphVisual> </GraphVisual>
  </div>

  <div class="faq-container">
    <FaqParent id="faq-component"></FaqParent>
  </div>

  <div class="blue-line"></div>
</template>
