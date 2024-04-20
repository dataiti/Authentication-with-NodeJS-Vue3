<template>
  <div class="w-[350px] p-10 flex flex-col gap-5 rounded-3xl bg-slate-200">
    <BaseTypography
      text="Login account"
      className="text-center text-2xl font-semibold"
    />
    <form @submit.prevent="handleSubmitLoginForm" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <BaseLabel label="Email" forId="email" class="px-2" />
        <BaseInput
          id="email"
          name="email"
          type="email"
          v-model="email"
          placeholder="Enter your email address"
        />
      </div>
      <div class="flex flex-col gap-1">
        <BaseLabel label="Password" forId="password" class="px-2" />
        <BaseInput
          id="password"
          name="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
        />
      </div>
      <RouterLink :to="{ name: 'forgot-password' }">
        <BaseTypography
          text="Forgot password ?"
          className="text-gray-600 font-semibold text-xs px-2"
        />
      </RouterLink>
      <BaseButton type="submit" dis text="Login Now" className="rounded-full" />
      <BaseTypography
        :text="resultMessage"
        className="text-red-500 text-center font-semibold text-xs px-2"
      />
      <div class="flex items-center gap-2 justify-center">
        <BaseTypography
          text="Don't have an account ?"
          className="text-gray-600 font-semibold text-xs px-2"
        />
        <RouterLink :to="{ name: 'register' }">
          <BaseTypography
            text="Register"
            className="text-teal-800 font-semibold text-sm underline"
          />
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { RouterLink } from "vue-router";
import { useStore, mapActions, mapGetters } from "vuex";
import { toast } from "vue3-toastify";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseLabel from "@/components/common/BaseLabel.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseTypography from "@/components/common/BaseTypography.vue";

const schema = yup.object({
  email: yup
    .string()
    .email("Email is invalid !")
    .required("Email field is required !"),
  password: yup
    .string()
    .required("Password field is required !")
    .min(8, "Password longer than 8 characters !")
    .max(16, "Password that does not exceed 16 characters !"),
});

const resultMessage = ref("");

const { handleSubmit, isSubmitting, isFieldValid, resetForm } = useForm({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: schema,
});

const store = useStore();

const handleSubmitLoginForm = handleSubmit(async (values) => {
  if (!isFieldValid) return;

  try {
    const res = await store.dispatch("login", { credentials: values });

    if (res && res.success) {
      resultMessage.value = "";
      resetForm({ email: "", password: "" });
      toast.success(res.message);
    } else {
      resultMessage.value = res.message;
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});
</script>
