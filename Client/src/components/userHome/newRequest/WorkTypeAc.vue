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

function handleChange() {
  //   props.checkInputData('isLocation')
  //   props.selectData(location.value)
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
      :class="['text-main', activeButton === 'first' ? 'border-button-active' : 'border-button']"
      @click="activeButton = 'first'"
    >
      <p>AC-Service</p>
    </button>

    <button
      type="button"
      :class="['text-main', activeButton === 'second' ? 'border-button-active' : 'border-button']"
      @click="activeButton = 'second'"
    >
      <p>AC-Service + rengöring</p>
    </button>

    <button
      type="button"
      :class="['text-main', activeButton === 'third' ? 'border-button-active' : 'border-button']"
      @click="activeButton = 'third'"
    >
      <p>Beskriv felet själv</p>
    </button>

    <textarea
      v-if="activeButton === 'third'"
      name="message-input"
      class="text-editor"
      placeholder="Beskriv vad du vill ha hjälp med..."
      @input="handleChange"
    ></textarea>
  </div>
</template>
