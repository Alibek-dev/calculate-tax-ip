<script setup lang="ts">
import {computed, ref} from "vue";

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  maxLength: {
    type: String,
    default: 200,
  }
})

const focused = ref(false)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit("update:modelValue", value)
  }
})
</script>

<template>
  <div>
    <div v-if="label" class="mb-2.5 italic text-base">{{ label }}</div>
    
    <div class="input-wrapper" :class="{ 'border-blue-500': focused, 'border-zinc-300': !focused }">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="value"
        @focus="focused = true"
        @blur="focused = false"
        :maxlength="maxLength"
      >
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  @apply rounded-[3px] border px-2.5 py-2
}

input {
  @apply w-full focus-visible:outline-none;

  &::placeholder {
    @apply text-zinc-300
  }
}
</style>