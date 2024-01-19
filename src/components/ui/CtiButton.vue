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
    class="rounded-md shadow text-center py-4 px-8 focus:ring focus:ring-gray-400 transition-colors"
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