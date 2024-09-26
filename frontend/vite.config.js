import { defineConfig } from 'vite'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		nodePolyfills(),
		react()],
		server: {
		port: 3000,
		proxy: {
			"/auth": {
				target: "http://localhost:8000",
				changeOrigin: true,
			},
			"/message": {
				target: "http://localhost:8000", 
				changeOrigin: true,
			},
		
			"/users": {
				 target: "http://localhost:8000", 
				 changeOrigin: true,
			},
		},

	},
	resolve: {
		alias: {
		  process: "process/browser"
		}
	},
});

