<script setup lang="ts">
import { useShowMessageDialog } from '@/stores/showMessageDialog'
import { computed, nextTick, onMounted, ref } from 'vue'
import MessageDialog from '../dialogs/MessageDialog.vue'

const props = defineProps({
  index: {
    type: Object,
    required: true
  },
  onAnswer: {
    type: Function,
    required: true
  }
})

const messageAnswer = ref('')
const priceOffer = ref('')

const isMessageBox = ref(false)
const isMessageAnswer = ref(false)
const isBtnDisabled = ref(true)
const showDialog = ref(false)

const isMessageDialog = computed(() => useShowMessageDialog().showMessageDialog)

let width = document.documentElement.clientWidth

const inputsArray: { key: string; value: boolean }[] = [{ key: 'isMessageAnswer', value: false }]

function getCookie(cookieName: string) {
  const cookiesArray = document.cookie.split(';')

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim()

    if (cookie.indexOf(cookieName + '=') === 0) return cookie.substring(cookieName.length + 1)
  }

  return null
}

const repairShopEmail = getCookie('email')

function updateScreenSize() {
  window.addEventListener('resize', updateScreenSize)
  width = document.documentElement.clientWidth

  if (width < 700) {
    showDialog.value = false
  } else {
    showDialog.value = true
  }
}

const answerData = computed(() => {
  return {
    customerName: props.index.name,
    customerId: props.index._id,
    customerEmail: props.index.email,
    repairShopEmail: repairShopEmail,
    customerMessage: messageAnswer.value,
    priceOffer: priceOffer.value,
    registrationNumber: props.index.registrationNumber
  }
})

function checkInputData() {
  isBtnDisabled.value = !inputsArray.every((field) => field.value)
  console.log(isBtnDisabled.value)
}

function checkInputDataAnswer() {
  nextTick(() => {
    if (messageAnswer.value === '') {
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

function showMessageBox() {
  isMessageBox.value = !isMessageBox.value
}

function showMessageDialog() {
  const showMessageDialog = useShowMessageDialog()
  showMessageDialog.showMessageContent(!isMessageDialog.value)
}

function sendAnswer() {
  props.onAnswer(answerData.value)
}

onMounted(() => {
  updateScreenSize()
})
</script>

<template>
  <MessageDialog v-if="isMessageDialog" :index="props.index"></MessageDialog>
  <div class="content-container-parent">
    <p class="customer-name">{{ props.index.name }}</p>
    <div class="">
      <div
        :class="
          isMessageBox
            ? 'repair-shop-form-text-container-extend'
            : 'repair-shop-form-text-container'
        "
      >
        <div class="top-nav" v-if="!isMessageBox">
          <p>{{ props.index.registrationNumber }}</p>
          <button v-if="!showDialog" type="button" class="show-more-btn" @click="showMessageBox">
            <fontAwesome :icon="['fas', 'chevron-down']" />
          </button>
          <button v-if="showDialog" type="button" class="show-more-btn" @click="showMessageDialog">
            Läs mer <fontAwesome :icon="['fas', 'chevron-right']" />
          </button>
        </div>

        <div class="extended-content-container" v-if="isMessageBox">
          <div class="top-nav-extended">
            <p><span>Registreringsnummer: </span>{{ props.index.registrationNumber }}</p>
            <button type="button" class="show-more-btn" @click="showMessageBox">
              <fontAwesome :icon="['fas', 'chevron-up']" />
            </button>
          </div>

          <div class="message-content" v-if="isMessageBox">
            <p>{{ props.index.message }}</p>
            <hr />
          </div>

          <textarea
            name="message-input"
            v-model="messageAnswer"
            class="text-editor-answer"
            placeholder="Svar"
            @input="checkInputDataAnswer"
          ></textarea>
        </div>
      </div>
      <label for="priceOffer" v-if="isMessageBox">Prisförslag</label>
      <input
        v-if="isMessageBox"
        type="text"
        name="priceOffer"
        placeholder="500 kr"
        v-model="priceOffer"
        maxlength="7"
      />

      <button
        v-if="isMessageBox"
        type="submit"
        :disabled="isBtnDisabled"
        :class="{
          'user-home-send-btn-disabled': isBtnDisabled,
          'user-home-send-btn': !isBtnDisabled
        }"
        @click="sendAnswer"
      >
        Skicka
      </button>
    </div>
  </div>
</template>
