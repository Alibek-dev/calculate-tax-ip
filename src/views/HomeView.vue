<script setup lang="ts">
import CtiButton from "@/components/ui/CtiButton.vue";
import CtiDropDownModal from "@/components/ui/CtiDropDownModal.vue";
import {ref} from "vue";
import CtlTextField from "@/components/ui/CtlTextField.vue";

const dialog = ref(null)

const form = ref({
  firstName: "",
  lastName: "",
  iin: "",
  income: "",
})
</script>

<template>
  <main>
    <cti-button secondary @click="(dialog as any).showDialog()">Налоговый вычет</cti-button>
  </main>
  <CtiDropDownModal ref="dialog">
    <div class="flex flex-col gap-6">
      <div class="text-1">
        Теперь ИП на упрощенке обязан уплачивать за себя ИПН и социальный налог. В связи с этими изменениями ИП должен платить за себя:
      </div>

      <div class="grid grid-cols-2 gap-5">
        <CtlTextField
          v-model="form.firstName"
          placeholder="Имя"
          label="Имя"
          max-length="30"
        />
        <CtlTextField
          v-model="form.lastName"
          placeholder="Фамилия"
          label="Фамилия"
          max-length="30"
        />
      </div>

      <CtlTextField
        v-model="form.iin"
        placeholder="ИИН"
        label="ИИН"
        max-length="12"
      />

      <CtlTextField
        v-model="form.iin"
        label="Режим налогообложения"
        max-length="12"
      />

      <CtlTextField
        v-model="form.income"
        placeholder="0 Т"
        label="Ваш доход за пол года"
        max-length="12"
      />
    </div>
  </CtiDropDownModal>
</template>
