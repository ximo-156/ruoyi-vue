<script setup lang="ts">
import { cn } from '@vben-core/shared/utils';

import { useVModel } from '@vueuse/core';

const props = defineProps<{
  class?: any;
  codeUrl: string;
  defaultValue?: number | string;
  modelValue?: number | string;
  placeholder?: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: number | string): void;
  (e: 'success', payload: number | string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: true,
});

const codeUrl = useVModel(props, 'codeUrl', emits, {
  defaultValue: props.codeUrl,
  passive: true,
});
const fetchCode = () => {
  emits('success', Date.now());
};
</script>

<template>
  <div class="flex w-full">
    <input
      v-model="modelValue"
      :placeholder="placeholder"
      :class="
        cn(
          'h-10 flex-1 rounded-bl-md rounded-tl-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    />
    <img
      @click="fetchCode"
      :src="codeUrl"
      :class="
        cn(
          'w-25 h-10 rounded-br-md rounded-tr-md border border-l-0 border-input',
          props.class,
        )
      "
    />
  </div>
</template>
<style lang="scss" scoped>
input {
  --ring: var(--primary);
}
</style>
