<template>
  <div class="relative">
    <input
      :id="name"
      :placeholder="placeholder"
      v-model="value"
      :type="type"
      spellcheck="false"
      :class="[
        `w-full outline-none rounded-full bg-white px-6 py-3 text-sm border-2 ${
          errorMessage ? 'border-red-500' : 'border-green-500'
        }`,
        className,
      ]"
    />
    <BaseTypography
      :text="errorMessage"
      class="absolute -bottom-4 px-2 text-xs font-semibold text-red-500"
    />
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import BaseTypography from "../common/BaseTypography.vue";

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, default: "text" },
  placeholder: { type: String, required: true },
  modelValue: String,
  className: String,
  isError: Boolean,
});

const { value, errorMessage } = useField(props.name);
</script>
