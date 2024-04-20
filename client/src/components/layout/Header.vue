<template>
  <header
    class="flex items-center justify-between px-[100px] h-[80px] bg-teal-950"
  >
    <div></div>
    <div v-if="isLoggedIn && user" class="flex items-center gap-2">
      <BaseTypography :text="user.email" className="text-white" />
      <BaseButton text="Logout" @click="handleLogout" />
    </div>
    <div v-else class="flex gap-2">
      <BaseButton :to="{ name: 'login' }" text="Login" />
      <BaseButton :to="{ name: 'register' }" text="Register" />
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import BaseButton from "../common/BaseButton.vue";
import BaseTypography from "../common/BaseTypography.vue";

const store = useStore();

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const user = computed(() => store.getters.user);

const handleLogout = async () => {
  try {
    const res = await store.dispatch("logout");

    if (res && res.success) {
      toast.success(res.message);
    }
  } catch (error) {}
};
</script>

<style></style>
