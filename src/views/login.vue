<template>
  账号：<input type="text" v-model="name">
  密码：<input type="text" v-model="password">
  <button @click="login">登录</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'login',
  setup() {
    const name = ref('');
    const password = ref('');
    const router = useRouter();
    const login = () => {
      const params = {
        loginUserType: 'appUser',
        phone: name.value,
        password: password.value
      }
      axios.post(`${process.env.VUE_APP_API}/login`, params).then((r:any) => {
        const data = r.data
        sessionStorage.setItem('login', data.token)
        router.push({
          path: '/'
        })
        setTimeout(() => {
          location.reload();
        }, 100)
      })
    }
    return {
      name,
      password,
      login
    }
  }
})
</script>

<style scoped>

</style>
