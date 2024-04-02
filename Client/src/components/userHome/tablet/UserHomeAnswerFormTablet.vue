<script setup lang="ts">
import type { IUserContact } from '@/models/IUserContact'
import { removedAnsweredRequests } from '@/services/RepariShopAnswer'
import { removeUserRequest } from '@/services/removeRequest'
import { answerRepairShops } from '@/services/userContact'
import { nextTick, onMounted, ref } from 'vue'
import ConfirmDialog from '../../dialogs/ConfirmDialog.vue'
import UserHomeAnswerForm from '../UserHomeAnswerForm.vue'
import UserHomeMessages from '../UserHomeMessages.vue'

const props = defineProps({
  numberOfAnswers: {
    type: Function,
    required: true
  }
})

const mobile = ref(true)
const tablet = ref(false)
const isData = ref(false)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)
const isTrashBtn = ref(false)
const isConfirmDialog = ref(false)

const customerMessage = ref('')
const setLineActive = ref('')

const allRepairShopAnswers = ref<IUserContact[]>([])
const requestData = ref<IUserContact[]>([])
const messageArray: { message: string; name: string; date: string }[] = []
const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

const customerEmail = localStorage.getItem('userEmail')
const customerName = localStorage.getItem('userName')

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

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
}

function checkInputDataAnswer() {
  nextTick(() => {
    if (customerMessage.value === '') {
      return
    } else {
      isMessageAnswer.value = true

      const index = inputsArray.findIndex((field) => field.key === 'isMessageAnswer')

      if (index !== -1) {
        inputsArray[index].value = isMessageAnswer.value
      } else {
        inputsArray.push({ key: 'isMessageAnswer', value: isMessageAnswer.value })
      }

      checkInputData()
    }
  })
}

let customerData = {}

async function handleAnswerMobile(answerDataMobileForm: IUserContact) {
  await answerRepairShops(answerDataMobileForm as IUserContact)
  getAnswers()
}

async function showRequestData(
  customerMessage: string,
  repairShopAnswer: string,
  index: string | undefined
) {
  setLineActive.value = index ? index : ''

  const foundAnswer = allRepairShopAnswers.value.find((answer) => answer._id === index)
  if (foundAnswer) {
    requestData.value = [foundAnswer]

    sortRequestData(
      customerMessage as unknown as { message: string; name: string; date: string }[],
      repairShopAnswer as unknown as { message: string; name: string; date: string }[]
    )
  } else {
    console.log('Answer not found!')
  }
}

function sortRequestData(
  customerMessage: { message: string; name: string; date: string }[],
  repairShopAnswer: { message: string; name: string; date: string }[]
) {
  messageArray.splice(0, messageArray.length)
  const flattenedMessages = customerMessage.concat(repairShopAnswer)

  flattenedMessages.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  messageArray.push(...flattenedMessages)

  isData.value = true
  console.log(isData.value)
}

function showTrashBtn() {
  isTrashBtn.value = true
}

function hideTrashBtn() {
  isTrashBtn.value = false
}

async function sendAnswer() {
  customerData = {
    ...customerData,
    customerAnswer: customerMessage.value
  }

  await answerRepairShops(customerData as IUserContact)
}

async function removeRequest() {
  await removeUserRequest(requestData.value as object)
  isConfirmDialog.value = false
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
    <form @submit.prevent="" class="user-sent-answer-form" v-if="tablet">
      <div class="request-column">
        <div
          class="request-container-tablet"
          @mouseover="showTrashBtn"
          @mouseleave="hideTrashBtn"
          v-for="index in allRepairShopAnswers"
          :key="index._id"
        >
          <p class="text-main font-text-light">{{ index.repairShopName }}</p>
          <div class="request-container-content-tablet">
            <p><span>Registreringsnummer: </span>{{ index.registrationNumber }}</p>
            <button
              type="button"
              class="show-more-btn"
              @click="
                showRequestData(
                  index.customerMessage,
                  index.repairShopAnswer ? index.repairShopAnswer : '',
                  index._id
                )
              "
            ></button>
          </div>
          <button
            type="button"
            :class="isTrashBtn ? 'trash-btn-visible' : 'trash-btn'"
            @click="() => ((isConfirmDialog = true), (setLineActive = index._id as string))"
          >
            <fontAwesome :icon="['fas', 'trash']" />
          </button>
          <div :class="index._id === setLineActive ? 'line-active' : 'line-inactive'"></div>
        </div>
        <ConfirmDialog
          :removeRequest="removeRequest"
          :closeDialog="() => (isConfirmDialog = false)"
          v-if="isConfirmDialog"
        />
      </div>
      <div class="data-column">
        <div
          class="data-container-tablet"
          v-for="index in requestData"
          :key="index._id"
          v-if="isData"
        >
          <p class="text-main font-text-light">{{ index.repairShopName }}</p>
          <p class="text-main font-text-light">
            <span class="text-main font-title-bold">Registreringsnummer: </span
            >{{ index.registrationNumber }}
          </p>

          <div class="data-column-message-container">
            <UserHomeMessages
              v-for="index in messageArray"
              :key="index.date"
              :index="index"
              :amount="messageArray"
            ></UserHomeMessages>

            <textarea
              name="message-input"
              v-model="customerMessage"
              class="text-editor-answer"
              placeholder="Svar"
              @input="checkInputDataAnswer"
            ></textarea>

            <label for="priceOffer" class="text-main font-text-light">Prisförslag</label>
            <input
              type="text"
              name="priceOffer"
              maxlength="7"
              class="price-offer-input"
              :value="index.priceOffer"
              disabled
            />

            <button
              type="submit"
              :disabled="isBtnDisabled"
              :class="{
                'main-btn-disabled m-h-42': isBtnDisabled,
                'main-btn m-h-42': !isBtnDisabled
              }"
              @click="sendAnswer"
            >
              Skicka
            </button>
          </div>
        </div>
        <div class="display-flex flex-dir-col gap-16 p-relative" v-if="!isData">
          <div class="width-50p h-40 silhouette"></div>
          <div class="width-60p h-40 silhouette"></div>
          <div class="width-100 h-80 silhouette"></div>
          <div class="width-100 h-80 silhouette"></div>
          <div class="width-100 h-250 silhouette"></div>
          <div class="width-100 h-40 silhouette"></div>
          <div class="width-100 h-40 silhouette"></div>
          <div class="p-absolute top-0 left-0 width-100 h-100p bg-main-40"></div>
        </div>
      </div>
    </form>
  </div>
</template>
