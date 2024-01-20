<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <button
    type="button"
    class="rounded-md hover:shadow-2xl transition-all text-base italic text-center py-4 px-8 focus:shadow-2xl focus:ring focus:ring-gray-400"
    :class="{
      'bg-black text-white': !disabled && !secondary,
      'bg-white border-2 shadow-none text-zinc-400': disabled,
      'border border-black text-black': !disabled && secondary
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>

</style>