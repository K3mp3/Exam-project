<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FaqDropdown from './FaqDropdown.vue'

const mobile = ref(true)
const tablet = ref(false)

let width = document.documentElement.clientWidth

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  console.log(width)

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
    title: 'Hur används min data?',
    type: 'user data',
    text: 'Vi använder oss av cookies för att kunna använda funktioner så som halvautomatisk inloggning. När du loggar in sparas ditt namn, email adress samt typ av konto i cookies. Det görs även en notering i databasen om att du är inloggad. Detta görs för att kunna hantera utloggning, visa ditt namn när du är inloggad i form av Hej namn.'
  },
  {
    title: 'Hur vet jag om ni sparar cookies?',
    type: 'user data',
    text: 'När du går in på webbplatsen genom en ny webbläsare så får du frågan om du godkänner cookies eller inte. Klickar du på tillåt så sparas en cookie att du har godkänt detta och du behöver således inte godkänna cookies igen. Klickar du på tillåt inte så sparas inga cookies alls. Du kommer då också få denna fråga varje gång du besöker webbplatsen.'
  },
  {
    title: 'Hur sparas min data?',
    type: 'user data',
    text: 'De uppgifter du anger när du skapar ett konto sparas i databasen. Detta görs för att du ska kunna ha ett konto och kontakta verkstäder utan att varje gång skriva in din information.'
  },
  {
    title: 'Kostar tjänsten något?',
    type: 'pricing',
    text: 'Tjänsten är helt gratis för dig som privatperson. Verkstäder betalar dock en liten summa varje månad för att vara ansluten till plattformen.'
  },
  {
    title: 'Hur vet jag om jag fått svar?',
    type: 'general question',
    text: 'När du skriver i fråge formuläret för att kontakta verkstäder så går det ut ett mail till varje ansluten verkstad i den kommun du har valt. Verkstaden svarar sedan dig på mailen och konversationen tas vidare där'
  }
]

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <h2
    :class="{
      'font-title-bold t-b-gradient O14rem': mobile,
      'font-title-bold t-b-gradient O15rem': tablet
    }"
  >
    FAQ
  </h2>
  <FaqDropdown v-for="Q in faqTexts" :key="Q.title" :question="Q"></FaqDropdown>
</template>
