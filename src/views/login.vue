<template>
  账号(手机)：<input type="text" v-model="user.phone" /> 密码：<input
    type="text"
    v-model="user.password"
  />
  <button @click="login(user)">登录</button>
  <div v-for="item in users" :key="item.phone">
    <span>{{ item.phone }}</span>
    <span>---></span>
    <span>{{ item.role }}</span>
    <button @click="login(item)">登录</button>
  </div>
  <div>
    触发手术任务：<input v-model="opInfoId" /><button @click="begin">
      触发
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Request from '@/service/request';
export default defineComponent({
  name: 'login',
  setup() {
    const users = reactive([
      {
        phone: '13266661111',
        password: '1',
        role: '病区护士',
      },
      {
        phone: '13266662222',
        password: '1',
        role: '转运护工',
      },
      {
        phone: '18812341540',
        password: '1',
        role: '接送护士',
      },
      {
        phone: '18812341386',
        password: '1',
        role: '巡回护士',
      },
      {
        phone: '18812341628',
        password: '1',
        role: '复苏室护士',
      },
      {
        phone: '18812341650',
        password: '1',
        role: '总协调护士',
      },
    ]);
    const user = reactive({
      phone: '',
      password: '',
    });
    const router = useRouter();
    const login = (data: any) => {
      const { phone, password } = data;
      const params = {
        phone,
        password,
        loginUserType: 'appUser',
      };
      axios.post(`${process.env.VUE_APP_API}/login`, params).then((r: any) => {
        const data = r.data;
        sessionStorage.setItem('login', data.token);
        router.push({
          path: '/',
        });
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    };

    // 触发手术任务
    const opInfoId = ref('');
    const begin = () => {
      Request.xhr('notifyNextOperation', {}, `opInfoId=${opInfoId.value}`).then(
        (r: any) => {
          // const { code, data } = r;
          console.log(r);
        }
      );
    };
    return {
      user,
      users,
      opInfoId,
      login,
      begin,
    };
  },
});
</script>

<style scoped></style>
