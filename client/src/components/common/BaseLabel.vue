<template>
  <label
    :for="forId"
    :class="['text-sm font-semibold text-teal-600', className]"
    >{{ label }}</label
  >
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  forId: { type: String, required: true },
  className: { type: String, default: "" },
});
</script>
