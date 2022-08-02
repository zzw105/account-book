import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // 添加以下内容
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('iconpark-icon')
        }
      }
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    vueSetupExtend()
  ],
  server: {
    port: 4000, //指定端口号
    hmr: true
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";'
      }
    }
  },
  build: {
    outDir: 'vueDist'
  }
})
