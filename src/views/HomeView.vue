<script setup lang="ts">
import CtiButton from "@/components/ui/CtiButton.vue";
import CtiDropDownModal from "@/components/ui/CtiDropDownModal.vue";
import {ref} from "vue";

const dialog = ref(null)
</script>

<template>
  <main>
    <cti-button secondary @click="(dialog as any).showDialog()">Налоговый вычет</cti-button>

  </main>
  <CtiDropDownModal ref="dialog" />
</template>
