<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { getRepairShopOffer, removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { computed, onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'
import { useAuthStore } from '@/stores/storeSignedInUser'

const mobile = ref(true)
const tablet = ref(false)
const isData = ref(false)

const authStore = useAuthStore()
const userEmail = computed(() => authStore.getUser?.email)

const allRepairShopAnswers = ref<IUserContact[]>([])

const customerEmail = localStorage.getItem('userEmail')

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)

  if (document.documentElement.clientWidth > 699) {
    tablet.value = true
    mobile.value = false
  }

  if (document.documentElement.clientWidth < 700) {
    mobile.value = true
    tablet.value = false
  }
}

async function getAnswers() {
  isData.value = false
  const user = computed(() => {
    return {
      email: userEmail.value
    }
  })
  const allResponses = await getRepairShopOffer(user.value)
  console.log('allResponses:', allResponses)
  console.log(allRepairShopAnswers.value)
  console.log(userEmail.value)

  allRepairShopAnswers.value = allResponses.filter((message: IUserContact) => {
    const flattenedMessages = message.customerMessage.flat()

    const hasUnansweredMessage = flattenedMessages.some((customerMessage) => {
      return customerMessage.answeredByRepairShop === true
    })

    return hasUnansweredMessage
  })

  console.log('allResponses:', allRepairShopAnswers.value)
}

async function handleAnswerMobile(answerDataMobileForm: IUserContact) {
  await answerRepairShops(answerDataMobileForm as IUserContact)
  getAnswers()
}

onMounted(() => {
  getAnswers()
  updateScreenSize()
})
</script>

<template>
  <div class="request-form-main">
    <form @submit.prevent="" class="bg-red-500 flex flex-col gap-4" v-if="mobile">
      <UserHomeAnswerForm
        v-for="index in allRepairShopAnswers"
        :key="index._id"
        :index="index"
        :onAnswer="handleAnswerMobile"
        :reFetch="getAnswers"
      ></UserHomeAnswerForm>
    </form>
    <UserHomeAnswerFormTablet v-if="tablet" />
  </div>
</template>
