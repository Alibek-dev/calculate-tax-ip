<script setup lang="ts">
import type {ComputedRef, PropType} from "vue";
import {computed, ref} from "vue";
import CtiIcon from "@/components/ui/CtiIcon.vue";
import CtiChevronIcon from "@/components/icons/CtiChevronIcon.vue";
import type {SelectItemType} from "@/@types/select.types";

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  items: {
    type: Array as PropType<SelectItemType[]>,
    required: true,
    default: [],
  },
  default: {
    type: String,
    required: false,
    default: null,
  },
  modelValue: {
    type: String as PropType<String | null>,
    default: null,
  },
  label: {
    type: String,
    default: "",
  }
})

const open = ref(false)
const focused = ref(false)

const selected: ComputedRef<SelectItemType | null> = computed(() => props.items.find((item: SelectItemType) => item.value === props.modelValue) ?? null)

const selectOption = (item: SelectItemType) => {
  open.value = false
  emit("update:modelValue", item.value)
}

</script>

<template>
  <div class="relative cursor-pointer" @blur="open = false">

    <div v-if="label" class="mb-2.5 italic text-base">{{ label }}</div>
    <button
      class="border rounded-[3px] px-2.5 py-2 w-full flex justify-between items-center"
      :class="{ open: open, 'border-blue-500': focused, 'border-zinc-300': !focused }"
      @click="open = !open"
      @focus="focused = true"
      @blur="focused = false"
    >
      <div>{{ selected ? selected.text : "" }}</div>
      <CtiIcon size="24" class="transition-transform" :class="{ 'rotate-180': !open }"><CtiChevronIcon /></CtiIcon>
    </button>
    <div v-if="open" class="items">
      <div
        v-for="(option, i) of items"
        :key="i"
        @click="selectOption(option)"
        class="cursor-pointer hover:bg-gray-200 pt-3"
      >
        <div class="px-2.5 mb-3">{{ option.text }}</div>
        <div v-if="i !== items.length - 1" class="w-full h-[1px] bg-zinc-300"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.items {
  @apply absolute bg-white border-x border-b border-zinc-300 w-full flex flex-col rounded-[3px]
}
</style>