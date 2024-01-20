<script setup lang="ts">
import {computed, ref} from "vue";
import type {PropType} from "vue";
import {MaskTypes} from "@/@types/index.types";
import {MaskRules} from "@/config/consts";

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
  },
  maskType: {
    type: String as PropType<MaskTypes>,
    default: MaskTypes.any,
  },
  reversedMask: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
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

const maskRule = computed(() => MaskRules[props.maskType] ?? MaskRules[MaskTypes.any])
</script>

<template>
  <div>
    <div v-if="label" class="mb-2.5 italic text-base">{{ label }}</div>
    
    <div
      class="input-wrapper"
      :class="{
        'border-blue-500': focused && !errorMessage,
        'border-zinc-300': !focused && !errorMessage,
        'border-red-500': errorMessage
      }"
    >
      <input
        type="text"
        :placeholder="placeholder"
        v-model="value"
        @focus="focused = true"
        @blur="focused = false"
        :maxlength="maxLength"
        v-mask
        :data-maska="maskRule"
        :data-maska-reversed="reversedMask"
      >
      <div v-if="errorMessage" class="absolute mt-2.5 left-0 text-red-500 text-xs shake-animation">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  @apply rounded-[3px] border px-2.5 py-2 relative
}

input {
  @apply w-full focus-visible:outline-none;

  &::placeholder {
    @apply text-zinc-300
  }
}
</style>