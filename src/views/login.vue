<template>
  账号(手机)：<input type="text" v-model="user.phone" /> 密码：<input
    type="text"
    v-model="user.password"
  />
  <button @click="login(user)">登录</button>
  <h3>开发账号</h3>
  <div v-for="item in testUsers2" :key="item.phone">
    <span>{{ item.phone }}</span>
    <span>---></span>
    <span>{{ item.role }}</span>
    <button @click="login(item)">登录</button>
  </div>

  <br>
  <div>
    触发手术任务：测试数据(传入opCode就从此台手术后加数据,不传重置默认数据)
    <input v-model="opCode" /><button @click="begin">触发</button>
  </div>
  <FlowChart :flow-data="chartData" :currentCode="6" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Request from '@/service/request';
export default defineComponent({
  name: 'login',
  setup() {
    const chartData = ref([1, 6, 10, 7, 3]);
    const testUsers2 = reactive([
      {
        phone: '13266660001',
        password: '1',
        role: '病区护士',
      },
      {
        phone: '13266660002',
        password: '1',
        role: '转运护工',
      },
      {
        phone: '13266660003',
        password: '1',
        role: '接送护士',
      },
      {
        phone: '13266660004',
        password: '1',
        role: '巡回护士',
      },
      {
        phone: '13266660005',
        password: '1',
        role: '复苏室护士',
      },
      {
        phone: '13266660006',
        password: '1',
        role: '总协调护士',
      },
      {
        phone: '13266660010',
        password: '1',
        role: '清洁护工',
        path: '/cleanTask'
      },
    ]);
    const user = reactive({
      phone: '',
      password: '',
    });
    const router = useRouter();
    const login = (data: any) => {
      const { phone, password, path } = data;
      const params = {
        phone,
        password,
        loginUserType: 'appUser',
      };
      axios.post(`${process.env.VUE_APP_API}/login`, params).then((r: any) => {
        const data = r.data;
        sessionStorage.setItem('login', data.token);
        router.push({
          path: path || '/',
        });
        setTimeout(() => {
          location.reload();
        }, 100);
      });
    };

    // 触发手术任务
    const opCode = ref('');
    const begin = () => {
      Request.xhr(
        'nurseOperateTest',
        {},
        opCode.value ? `opCode=${opCode.value}` : ''
      ).then((r: any) => {
        // const { code, data } = r;
        console.log(r);
      });
    };
    return {
      chartData,
      user,
      testUsers2,
      opCode,
      login,
      begin,
    };
  },
});
</script>

<style scoped></style>
