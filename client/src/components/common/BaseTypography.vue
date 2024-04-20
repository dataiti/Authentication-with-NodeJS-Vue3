<template>
  <p v-show="text" :class="['', className]">{{ text }}</p>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
  className: String,
});
</script>

<style></style>
