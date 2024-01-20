<script setup lang="ts">
import CtiButton from "@/components/ui/CtiButton.vue";
import CtiDropDownModal from "@/components/ui/CtiDropDownModal.vue";
import {computed, ref} from "vue";
import CtiTextField from "@/components/ui/CtiTextField.vue";
import CtiSelect from "@/components/ui/CtiSelect.vue";

const dialog = ref(null)

const form = ref({
  firstName: "",
  lastName: "",
  iin: "",
  taxType: "lite",
  income: "",
})

const options = computed(() => [
  { text: "Упрощённый", value: "lite" },
  { text: "Общеустановленный", value: "main" },
])
</script>

<template>
  <main>
    <cti-button secondary @click="(dialog as any).showDialog()">Налоговый вычет</cti-button>
  </main>
  <CtiDropDownModal ref="dialog">
    <div class="flex flex-col gap-6 mb-28">
      <div class="text-1">
        Теперь ИП на упрощенке обязан уплачивать за себя ИПН и социальный налог. В связи с этими изменениями ИП должен платить за себя:
      </div>

      <div class="grid grid-cols-2 gap-5">
        <CtiTextField
          v-model="form.firstName"
          placeholder="Имя"
          label="Имя"
          max-length="30"
        />
        <CtiTextField
          v-model="form.lastName"
          placeholder="Фамилия"
          label="Фамилия"
          max-length="30"
        />
      </div>

      <CtiTextField
        v-model="form.iin"
        placeholder="ИИН"
        label="ИИН"
        max-length="12"
      />

      <CtiSelect
        label="Режим налогообложения"
        :items="options"
        item-text="text"
        item-value="value"
        v-model="form.taxType"
      />

      <CtiTextField
        v-model="form.income"
        placeholder="0 Т"
        label="Ваш доход за пол года"
        max-length="12"
      />
    </div>
    <CtiButton class="w-full">Рассчитать</CtiButton>
  </CtiDropDownModal>
</template>
