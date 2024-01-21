<script setup lang="ts">
import {ref} from "vue";
import CtiCloseIcon from "@/components/icons/CtiCloseIcon.vue";
import CtiIcon from "@/components/ui/CtiIcon.vue";

const isShow = ref(false)
const backdropShow = ref(false)

const showDialog = () => {
  isShow.value = true
  setTimeout(() => backdropShow.value = true, 100)
}

const closeDialog = () => {
  backdropShow.value = false
  setTimeout(() => isShow.value = false, 300)
}

defineExpose({
  showDialog,
})
</script>

<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="ease-in duration-150"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="duration-150"
    leave-to-class="opacity-0"
  >
    <div v-if="isShow" @click.stop="closeDialog" class="h-[100vh] w-full bg-graniteGray absolute z-10">
      <transition
        enter-from-class="translate-y-full"
        enter-active-class="duration-300 ease-in"
        enter-to-class="translate-y-0"
        leave-from-class="translate-y-0"
        leave-active-class="duration-300"
        leave-to-class="translate-y-full"
      >
        <div v-if="backdropShow" class="bg-white h-full mt-10 z-50 rounded-t-[30px] px-6 overflow-y-auto pb-20" @click.stop>
          <div v-touch:swipe.bottom="closeDialog" class="select-none">
            <div class="flex justify-center rounded-[2px] py-3">
              <div class="bg-[#e0e0e0] w-6 h-1"></div>
            </div>
            <div class="flex justify-between items-center mb-6">
              <div class="title">Заплатить налоги за ИП</div>
              <cti-icon @click="closeDialog" class="text-neutral-400 cursor-pointer" size="18"><cti-close-icon /></cti-icon>
            </div>
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>

</style>