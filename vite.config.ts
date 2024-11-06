import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite';
import mockDevServerPlugin from 'vite-plugin-mock-dev-server';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const envConf = loadEnv(mode.mode, process.cwd());
  const { VITE_SOURCE_MAP, VITE_REMOVE_CONSOLE } = envConf;

  return {
    plugins: [
      react({
        exclude: ['mock/**/*.*', 'dist/**/*.*']
      }),
      mockDevServerPlugin({
        formidableOptions: {
          uploadDir: path.join(process.cwd(), 'uploads')
        }
      })
    ],
    base: './',
    logLevel: 'info',
    build: {
      sourcemap: VITE_SOURCE_MAP === 'true', // 输出.map文件
      rollupOptions: {
        output: {
          chunkFileNames: `js/chunks/[name].[hash].js`,
          entryFileNames: `js/[name].[hash].js`,
          assetFileNames: `assets/[ext]/[name].[hash].[ext]`
        }
      },
      outDir: 'build'
    },
    esbuild: {
      drop: VITE_REMOVE_CONSOLE === 'true' ? ['console', 'debugger'] : []
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 8080,
      host: '0.0.0.0',
      open: true,
      cors: true,
      proxy: {
        '/mock': {
          target: 'https://sellercraft.eu.auth0.com/',
          changeOrigin: true
        },
        '/tokencraft': {
          target: 'https://tokencraft.piggylabs.com/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tokencraft/, '')
        },
        '/streams': {
          target: 'https://open.sellercraft.co/v1',
          changeOrigin: true
        }
      }
    },
    define: {
      'process.env': {}
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true //注意，这一句是在less对象中，写在外边不起作用
        }
      }
    }
  };
});
