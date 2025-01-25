// 进行axios二次封装：使用请求和响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
// 引入用户相关仓库
import useUserStore from '@/store/modules/user';

// 1.利用create方法创建axios实例（其他配置：基础路径、超时时间等）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,   // 基础路径上会携带/api
  timeout: 5000,    // 超时时间
  withCredentials: true  // 允许携带凭证
});

// 2.request实例对象添加请求和响应拦截器
request.interceptors.request.use((config) => {
  // 获取用户相关小仓库：获取仓库内的token，登录成功后携带给服务器
  let userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  // headers请求头，经常给服务器端携带公共的参数
  // 返回配置对象
  return config;
});

// 3.响应拦截器
request.interceptors.response.use((response) => {
  // 成功回调
  // 简化数据
  return response.data;
}, (error) => {
  // 失败回调：处理http网络错误的
  // 存储网络错误信息
  let message = '';
  // http状态码
  let status = error.response.status;
  switch (status) {
    case 401:
      message = 'Token 过期';
      break;
    case 403:
      message = '无权访问';
      break;
    case 404:
      message = '请求地址错误';
      break;
    case 500:
      message = '服务器出现问题';
      break;
    default:
      message = '网络出现问题';
      break;
  }
  // 提示错误信息
  ElMessage({
    type: 'error',
    message
  });

  return Promise.reject(error);
});

// 对外暴露
export default request;
