<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';

import { computed, ref } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { codeApi } from '#/api/core/auth';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'vben',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
];
const codeUrl = ref<string>('');
const uuid = ref<string>('');
const fetchCode = async () => {
  const res = await codeApi();
  // console.log("data:image/gif;base64," + res.img);
  codeUrl.value = `data:image/gif;base64,${res.img}`;
  uuid.value = res.uuid;
};

fetchCode();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    // {
    //   component: 'VbenSelect',
    //   componentProps: {
    //     options: MOCK_USER_OPTIONS,
    //     placeholder: $t('authentication.selectAccount'),
    //   },
    //   fieldName: 'selectAccount',
    //   label: $t('authentication.selectAccount'),
    //   rules: z
    //     .string()
    //     .min(1, { message: $t('authentication.selectAccount') })
    //     .optional()
    //     .default('vben'),
    // },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: 'admin123',
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      defaultValue: 'admin',
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },

    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      defaultValue: 'admin123',

      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputImage',
      componentProps: {
        placeholder: $t('authentication.codeTip1'),
        codeUrl: codeUrl.value,
        onSuccess: () => {
          fetchCode();
        },
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().min(1, { message: $t('authentication.codeTip1') }),
      dependencies: {
        trigger(values, form) {
          form.setValues({
            uuid: uuid.value,
          });
        },
        triggerFields: [''],
      },
    },
    // {
    //   component: markRaw(SliderCaptcha),
    //   fieldName: 'captcha',
    //   rules: z.boolean().refine((value) => value, {
    //     message: $t('authentication.verifyRequiredTip'),
    //   }),
    // },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
