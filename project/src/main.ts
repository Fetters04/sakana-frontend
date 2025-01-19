import {createApp} from 'vue';
import App from '@/App.vue';
// 引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// svg插件配置
import 'virtual:svg-icons-register';
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponent from './components';

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn  // 国际化配置
});
// 安装自定义插件
app.use(globalComponent);

app.mount('#app');
