<template>
  <div :class="['flex flex-col gap-1', className]">
    <BaseLabel :label="label" :forId="fieldId" className="px-2" />
    <BaseInput
      :id="fieldId"
      :name="name"
      :attrs="attrs"
      :model="modelValue"
      :placeholder="placeholder"
      :className="inputClass"
    />
    <BaseTypography
      :text="error"
      className="px-2 text-xs font-semibold text-red-500"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import BaseLabel from "@/components/common/BaseLabel.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseTypography from "@/components/common/BaseTypography.vue";

const props = defineProps({
  label: { type: String, required: true },
  fieldId: { type: String, required: true },
  name: { type: String, required: true },
  modelValue: { type: String, required: true },
  attrs: { type: Object, required: true },
  placeholder: { type: String, required: true },
  error: { type: String, default: "" },
  className: { type: String, default: "" },
});
</script>
