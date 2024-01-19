<script lang="ts">
import {useRoute} from "vue-router";
import {computed, defineComponent} from "vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import EmptyLayout from "@/components/layouts/EmptyLayout.vue";

export default defineComponent({
  components: {
    EmptyLayout,
    MainLayout,
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => (route.meta.layout || 'Empty') + '-layout')

    return {
      layout
    }
  }
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped>
</style>
