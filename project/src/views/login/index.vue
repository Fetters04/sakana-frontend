<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!--登录表单-->
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到甄选运营平台</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user.ts';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
// 引入获取当前时间的函数
import { getTime } from '@/utils/time.ts';

// 获取el-form组件
let loginForms = ref();
// 创建用户仓库
let useStore = useUserStore();
// 获取路由器
let $router = useRouter();
// 控制按钮加载效果
let loading = ref(false);
// 收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' });

// 登录按钮回调
const login = async () => {
  // 保证全部表单项校验通过再发请求
  await loginForms.value.validate();
  // 加载效果：开始加载...
  loading.value = true;
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm);
    // 编程式导航跳转到主页
    await $router.push('/');
    // 登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI, ${getTime()}好`
    });
    // 登录成功加载效果消失
    loading.value = false;
  } catch (error) {
    // 登录失败加载效果消失
    loading.value = false;
    // 登录失败提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message
    });
  }
};

/**
 * 自定义校验规则函数
 * @param rule  校验规则对象
 * @param value 表单元素文本内容
 * @param callback  符合callback放行，不符合注入错误提示信息
 */
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('用户名长度至少5位'));
  }
};
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少6位'));
  }
};

// 定义表单校验需要的配置对象
const rules = {
  username: [
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    { trigger: 'change', validator: validatorPassword }
  ]
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
