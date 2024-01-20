<script setup lang="ts">
import {computed} from "vue";
import {formatCurrencyUtils} from "@/utrils/currency.utils";

const props = defineProps({
  taxName: {
    type: String,
    required: true,
  },
  taxDescription: {
    type: String,
    required: true,
  },
  taxSum: {
    type: Number,
    default: 0,
  },
  checked: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(["update:checked"])

const checked = computed({
  get() {
    return props.checked
  },
  set(value: boolean) {
    emit("update:checked", value)
  }
})
</script>

<template>
  <div class="card flex flex-col justify-between" :class="{ 'h-[128px]': checked }" @click="checked = !checked">
    <div class="flex justify-between items-start">
      <div>
        <img v-if="checked" src="@/assets/svg/checked.svg" alt="">
        <img v-else src="@/assets/svg/unchecked.svg" alt="">
      </div>
      <div class="text-end">
        <div class="text-2xl">{{ taxName }}</div>
        <div class="text-xs text-neutral-400" v-html="taxDescription"></div>
      </div>
    </div>

    <div v-if="checked" class="flex justify-between items-center">
      <div>{{ formatCurrencyUtils(taxSum) }}</div>
      <div>
        <img src="@/assets/svg/info.svg" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply py-[18px] px-[25px] shadow-[0_0_24px_0] shadow-[#9D9D9D] rounded-md bg-white max-h-[128px] select-none;
}
</style>