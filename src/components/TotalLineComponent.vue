<script setup lang="ts">
import {formatCurrencyUtils} from "@/utrils/currency.utils";

defineProps({
  title: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="flex items-end justify-between gap-12">
    <div class="title">{{ title }}</div>
    <div class="title text-end whitespace-nowrap">{{ formatCurrencyUtils(sum) }}</div>
  </div>
</template>

<style scoped>

</style>