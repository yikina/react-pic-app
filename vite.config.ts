import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(), //react()配置后不需要每页再引入react
		vitePluginImp({
			//按需引入 Antd 的样式和组件
			libList: [
				{
					libName: 'antd',
					style: (name) => `antd/es/${name}/style`
				}
			]
		})
	],
	resolve: {
		alias: {
			'&': path.resolve(__dirname, './src') // 路径别名
		},
		extensions: ['.tsx', '.ts', '.js', '.json'] // 导入时想要省略的扩展名列表
	},
	css: {
		preprocessorOptions: {
			scss: {
				//引入项目自定义变量
				additionalData: `@import "./src/style/index.scss";`
			}
		}
	},
	esbuild: {
		//打包时更改
		// drop: ['console', 'debugger']
	},
	server: {
		port: 3022 //启动端口
	}
});
