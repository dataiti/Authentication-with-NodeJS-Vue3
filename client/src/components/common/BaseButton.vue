<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    :disabled="disabled"
    @click="handleClick"
    :class="[
      `py-3 px-8 bg-teal-700 text-white rounded-md active:bg-teal-800 hover:bg-teal-600 transition-all ${
        disabled && 'opacity-50'
      }`,
      className,
    ]"
  >
    {{ text }}
  </component>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute, RouterLink } from "vue-router";

const props = defineProps({
  type: { type: String, default: "button" },
  text: { type: String, default: "" },
  to: { type: [String, Object] },
  disabled: { type: Boolean, default: false },
  onClick: { type: Function },
  className: String,
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};

const resolveTo = () => {
  const route = useRoute();
  if (typeof props.to === "object") {
    return { ...props.to, query: { ...props.to.query, ...route.query } };
  }
  return props.to;
};
</script>
