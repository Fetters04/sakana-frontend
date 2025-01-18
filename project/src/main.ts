import {createApp} from 'vue';
import App from '@/App.vue';
// 引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn  // 国际化配置
});
app.mount('#app');
