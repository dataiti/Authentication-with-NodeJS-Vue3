<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="h-[calc(100vh-80px)] flex items-center justify-center">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";

import Header from "@/components/layout/Header.vue";
</script>

<style></style>
