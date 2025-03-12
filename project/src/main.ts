import { createApp } from 'vue';
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
// 引入模板的全局样式
import './styles/index.scss';
// 引入路由
import router from './router';
// 引入pinia仓库
import pinia from './store';
// 引入路由鉴权文件
import './permission';
// 引入暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css';
// 引入自定义指令文件
import { isHasButton } from '@/directive/has';

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn  // 国际化配置
});
// 安装自定义插件
app.use(globalComponent);
// 注册模板路由
app.use(router);
// 安装仓库
app.use(pinia);
// 全局应用自定义指令
isHasButton(app);

app.mount('#app');
