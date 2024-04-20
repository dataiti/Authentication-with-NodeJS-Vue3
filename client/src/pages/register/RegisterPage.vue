<template>
  <div
    class="flex flex-col gap-4 justify-center items-center w-[350px] bg-slate-200 rounded-3xl p-10"
  >
    <BaseTypography text="Register Account" className="text-xl font-semibold" />
    <form
      @submit.prevent="handleSubmitRegisterForm"
      class="w-full flex flex-col gap-4"
    >
      <div class="flex flex-col gap-1">
        <BaseLabel label="Firstname" forId="firstName" class="px-2" />
        <BaseInput
          id="firstName"
          name="firstName"
          type="firstName"
          v-model="firstName"
          placeholder="Enter your firstName"
        />
      </div>
      <div class="flex flex-col gap-1">
        <BaseLabel label="Lastname" forId="lastName" class="px-2" />
        <BaseInput
          id="lastName"
          name="lastName"
          type="lastName"
          v-model="lastName"
          placeholder="Enter your lastName"
        />
      </div>
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
      <BaseButton
        type="submit"
        :disabled="isSubmitting"
        text="Register"
        className="rounded-full"
      />
      <BaseTypography
        :text="resultMessage"
        className="text-red-500 text-center font-semibold text-xs px-2"
      />
      <div class="flex items-center gap-2 justify-center">
        <BaseTypography
          text="Already have an account ?"
          className="text-gray-600 font-semibold text-xs px-2"
        />
        <RouterLink :to="{ name: 'login' }">
          <BaseTypography
            text="Login"
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
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

import BaseLabel from "@/components/common/BaseLabel.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseTypography from "@/components/common/BaseTypography.vue";
import BaseField from "@/components/common/BaseField.vue";
import BaseButton from "@/components/common/BaseButton.vue";

const schema = yup.object({
  firstName: yup.string().required("FirstName field is required"),
  lastName: yup.string().required("LastName field is required"),
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email field is required"),
  password: yup
    .string()
    .required("Password field is required")
    .min(8, "Password longer than 8 characters")
    .max(16, "Password that does not exceed 16 characters"),
});

const resultMessage = ref("");

const { handleSubmit, isSubmitting, isFieldValid, resetForm } = useForm({
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  validationSchema: schema,
});

const store = useStore();

const handleSubmitRegisterForm = handleSubmit(async (values) => {
  if (!isFieldValid) return;

  try {
    const res = await store.dispatch("register", { credentials: values });

    if (res && res.success) {
      resultMessage.value = "";
      resetForm({ firstName: "", lastName: "", email: "", password: "" });
      toast.success(res.message);
      Router.push;
    } else {
      resultMessage.value = res.message;
    }
  } catch (error) {}
});
</script>
