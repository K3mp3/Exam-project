<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FaqDropdown from './FaqDropdown.vue'

const mobile = ref(true)
const tablet = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 700) {
    mobile.value = true
    tablet.value = false
  } else {
    mobile.value = false
    tablet.value = true
  }
}

const faqTexts: { title: string; type: string; text: string }[] = [
  {
    title: 'Vad är Vibe?',
    type: 'general question',
    text: 'Vibe är en plattform som menar till att göra det enklare för dig som fordonsägare att hitta verkstäder bättre anpassad för din plånbok. Genom att skapa ett konto på plattformen kan du komma i kontakt med hundratals verkstäder på några få enkla klick. Du börjar med att registrera dig. Därefter loggar du in och är nu redo att kontakta verkstäder. Börja med att beskriva vad som är fel med din bil samt fylla i lite information om den men även vilken kommun du bor i'
  },
  {
    title: 'Hur används min data?',
    type: 'user data',
    text: 'Vi använder din data för att kunna hantera kontouppgifter och för att automatiskt skicka med den när du kontaktar en verkstad.'
  },
  {
    title: 'Hur vet jag om ni sparar cookies?',
    type: 'user data',
    text: 'Vi använder oss inte alls av cookies då vi vill spara så lite data om våra användare som möjligt.'
  },
  {
    title: 'Hur sparas min data?',
    type: 'user data',
    text: 'De uppgifter du anger när du skapar ett konto sparas i databasen. Detta görs för att du ska kunna kontakta verkstäder utan att varje gång behöva skriva in din information så som namn och email adress.'
  },
  {
    title: 'Kostar tjänsten något?',
    type: 'pricing',
    text: 'Tjänsten är helt gratis för dig som privatperson. Verkstäder betalar dock en liten summa varje månad för att vara ansluten till plattformen.'
  },
  {
    title: 'Varför måste jag betala när jag loggar in?',
    type: 'pricing',
    text: 'När du registrerar ett konto som en verkstad så skickas du till en betalsida. Om du där väljer att avbryta betalningen måste du då betala första gången du loggar in.'
  },
  {
    title: 'Hur vet jag om jag fått svar?',
    type: 'general question',
    text: 'När du skriver i kontakt formuläret för att kontakta verkstäder så går det ut ett meddelande till varje verkstad i kommunen du har valt. De svarar sedan dig. Du får en notifikation på mailen, svaret ser du om du loggar in på plattformen'
  }
]

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <h2 class="t-b-gradient text-xl sm:text-2xl mt-16 xl:mt-32">FAQ</h2>
  <FaqDropdown v-for="Q in faqTexts" :key="Q.title" :question="Q"></FaqDropdown>
</template>
