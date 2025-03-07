<template>
  <el-button size="default" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" show-alpha :predefine="predefineColors"/>
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" size="default" inline-prompt
                   active-icon="MoonNight" inactive-icon="Sunny"/>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="default" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <!--用户头像-->
  <img :src="userStore.avatar" alt="logo">
  <!--下拉菜单-->
  <el-dropdown>
        <span>
          {{ userStore.username }}
          <el-icon>
            <arrow-down/>
          </el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { ref } from 'vue';

// 获取骨架的小仓库
let layoutSettingStore = useLayoutSettingStore();
// 获取用户的小仓库
let userStore = useUserStore();
// 获取路由器对象
let $router = useRouter();
// 获取路由对象
let $route = useRoute();
// 颜色选择器
const color = ref('rgba(255, 69, 0, 0.68)');
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]);
// 收集开关数据
let dark = ref<boolean>(false);

// 刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
// 全屏按钮点击回调
const fullScreen = () => {
  // DOM对象的属性：可以用来判断当前是不是全屏模式
  let full = document.fullscreenElement;
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的requestFullscreen方法，实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏模式
    document.exitFullscreen();
  }
};
// 退出登录点击回调
const logout = async () => {
  // 向服务端发请求
  await userStore.userLogout();
  // 跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } });
};

// switch开关的change事件，进行暗黑模式的切换
const changeDark = () => {
  // 获取HTML根节点
  let html = document.documentElement;
  dark.value ? html.className = 'dark' : html.className = '';
};
</script>

<script lang="ts">
export default {
  name: 'Setting'
};
</script>

<style scoped lang="scss">
img {
  margin: 0 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.el-dropdown {
  margin-right: 30px;
}
</style>
