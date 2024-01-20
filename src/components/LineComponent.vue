<script setup lang="ts">

import type {PropType} from "vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true
  },
  textSize: {
    type: String as PropType<"small" | "large">,
    default: "large"
  }
})
</script>

<template>
  <div class="flex items-end justify-between gap-12 italic" :class="{ 'text-base': textSize === 'small' }">
    <div>{{ text }}</div>
    <div class="text-end whitespace-nowrap">{{ value }}</div>
  </div>
</template>

<style scoped>

</style>