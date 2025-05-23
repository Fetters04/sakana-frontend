import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // viteMockServe({
      //   // 保证开发阶段可以使用mock接口
      //   enable: command === 'serve'
      // })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')  // 用 @ 代替 src
      }
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
