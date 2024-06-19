<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({
//   checkInputData: {
//     type: Function,
//     required: true
//   },
//   selectData: {
//     type: Function,
//     required: true
//   }
// })

const location = ref('')
const activeButton = ref('')
const workChosen = ref<number[]>([])

function handleChange() {
  //   props.checkInputData('isLocation')
  //   props.selectData(location.value)
}

function toggleWorkChoice(choice: number) {
  const index = workChosen.value.indexOf(choice)
  if (index === -1) {
    workChosen.value.push(choice)
  } else {
    workChosen.value.splice(index, 1)
  }
}
</script>

<template>
  <!-- <label for="workType">Typ av arbete</label>
  <select
    name="location"
    class="signed-in-contact-form-select"
    v-model="location"
    @change="handleChange"
  >
    <option value="AC">AC</option>
    <option value="Avgaser">Avgaser</option>
    <option value="Batteri">Batteri</option>
    <option value="Service">Service</option>
    <option value="Fordonsvård">Fordonsvård</option>
    <option value="Besiktning och förkontroll">Besiktning och förkontroll</option>
  </select> -->
  <div class="flex flex-col gap-6 mb-4">
    <button
      type="button"
      :class="['text-main', workChosen.includes(1) ? 'border-button-active' : 'border-button']"
      @click="toggleWorkChoice(1)"
    >
      <p>Byte av partikelfilter</p>
    </button>

    <button
      type="button"
      :class="['text-main', workChosen.includes(2) ? 'border-button-active' : 'border-button']"
      @click="toggleWorkChoice(2)"
    >
      <p>Eftermontering av partikelfilter</p>
    </button>

    <button
      type="button"
      :class="['text-main', workChosen.includes(3) ? 'border-button-active' : 'border-button']"
      @click="toggleWorkChoice(3)"
    >
      <p>Byte av katalysator</p>
    </button>

    <button
      type="button"
      :class="['text-main', workChosen.includes(4) ? 'border-button-active' : 'border-button']"
      @click="toggleWorkChoice(4)"
    >
      <p>Byte av ljuddämpare</p>
    </button>

    <button
      type="button"
      :class="['text-main', workChosen.includes(5) ? 'border-button-active' : 'border-button']"
      @click="toggleWorkChoice(5)"
    >
      <p>Byte av lambdasond</p>
    </button>

    <button
      type="button"
      :class="['text-main', workChosen.includes(6) ? 'border-button-active' : 'border-button']"
      @click="toggleWorkChoice(6)"
    >
      <p>Beskriv felet själv</p>
    </button>

    <textarea
      v-if="workChosen.includes(6)"
      name="message-input"
      class="text-editor"
      placeholder="Beskriv vad du vill ha hjälp med..."
      @input="handleChange"
    ></textarea>
  </div>
</template>
