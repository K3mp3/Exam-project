<script setup lang="ts">
import { useShowUserEmail } from '@/stores/showUserEmail'
import { onMounted, ref } from 'vue'
import FaqParent from '../FAQ/FaqParent.vue'
import CookieDialog from '../dialogs/CookieDialog.vue'
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
  <div class="background-container">
    <div class="info-container">
      <div class="text-parent-container top-container">
        <h2>Varför borde du använda vår tjänst?</h2>
        <ul>
          <li><span>Smidigt - </span>Allt sammlat på ett ställe</li>
          <li><span>Kostnadsfritt - </span>Tjänsten är helt gratis att använda</li>
          <li>
            <span>Ekonomiskt - </span>Du sparar pengar genom att välja det billigaste erbjudanet
          </li>
        </ul>
      </div>
      <div class="step-container">
        <div class="vertical-line"></div>

        <div class="text-containers">
          <div class="text-child-containers">
            <div class="text-parent-container">
              <div class="text-container">
                <fontAwesome :icon="['fas', 'user-plus']" style="color: #fff" />
                <h2>1. Skapa ett konto</h2>
                <p>Fyll i dina uppgifter för att skapa ett konto</p>
                <RouterLink to="register" class="router-link">Skapa konto</RouterLink>
              </div>
            </div>

            <div class="text-parent-container">
              <div class="text-container">
                <fontAwesome :icon="['fas', 'keyboard']" style="color: #fff" />
                <h2>2. Kontakta verkstäder</h2>
                <p>
                  Skriv lite kort info om vad som är fel på bilen. Skicka sedan det till olika
                  verkstäder
                </p>
              </div>
            </div>

            <div class="text-parent-container">
              <div class="text-container">
                <fontAwesome :icon="['fas', 'message']" style="color: #fff" />
                <h2>3. Få svar</h2>
                <p>Sedan får du svar i din inkorg från olika verkstäder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="graph-parent-container">
    <GraphVisual> </GraphVisual>
  </div>

  <div class="faq-container">
    <FaqParent id="faq-component"></FaqParent>
  </div>

  <div class="blue-line"></div>

  <CookieDialog></CookieDialog>
</template>
