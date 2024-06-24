<script setup lang="ts">
const props = defineProps<{
  options: Option[];
  setSelectedOption: (option: Option) => void;
}>();

type Option = {
  key: string;
  value: string;
};

console.log(props.options)

props.options.forEach(option => {
  console.log(`Key: ${option.key}, Value: ${option.value}`);
});

function handleSelectedValue(optionValue: string) {
  const selectedOption = props.options.find(option => option.value === optionValue);
  if (selectedOption) {
    props.setSelectedOption(selectedOption);
  } else {
    console.log('Option not found');
  }
}
</script>

<template>
   <button
    v-for="option in props.options"
    :key="option.key"
      type="button"
      :class="['text-main border-button']"
      @click="handleSelectedValue(option.value)"
    >
      <p>{{ option.value }}</p>
    </button>

</template>
