<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { answerRepairShops } from '@/services/userContact'
import { onMounted, ref } from 'vue'
import UserHomeAnswerForm from './UserHomeAnswerForm.vue'
import UserHomeAnswerFormTablet from './tablet/UserHomeAnswerFormTablet.vue'

const props = defineProps({
  numberOfAnswers: {
    type: Function,
    required: true
  }
})

const mobile = ref(true)
const tablet = ref(false)
const isData = ref(false)

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
  const allResponses = await removedAnsweredRequests()
  allRepairShopAnswers.value = allResponses.map((response: []) => ({
    ...response,
    isLineActive: false
  }))

  allRepairShopAnswers.value = allRepairShopAnswers.value.filter(
    (answer) => answer.customerEmail === customerEmail && answer.answeredByRepairShop === true
  )

  props.numberOfAnswers(allRepairShopAnswers.value.length)
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
    <form @submit.prevent="" class="user-sent-answer-form-mobile" v-if="mobile">
      <UserHomeAnswerForm
        v-for="index in allRepairShopAnswers"
        :key="index._id"
        :index="index"
        :onAnswer="handleAnswerMobile"
        :reFetch="getAnswers"
      ></UserHomeAnswerForm>
    </form>
    <UserHomeAnswerFormTablet v-if="tablet" :numberOfAnswers="numberOfAnswers" />
  </div>
</template>
