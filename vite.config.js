import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

// standalone 모드: 폰트를 서브셋해서 HTML 한 파일로 번들 (오프라인 미리보기용)
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone';
  const fontEntry = standalone ? './src/styles/fonts.standalone.js' : './src/styles/fonts.js';

  return {
    // 상대 경로 base: GitHub Pages(/저장소이름/)·커스텀 도메인·로컬 어디서든 에셋 경로가 깨지지 않음
    base: './',
    plugins: [react(), tailwindcss(), ...(standalone ? [viteSingleFile()] : [])],
    resolve: {
      alias: {
        '@fonts': fileURLToPath(new URL(fontEntry, import.meta.url)),
      },
    },
    server: { host: '0.0.0.0', port: 5173, allowedHosts: true },
    preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
    build: {
      outDir: standalone ? 'dist-standalone' : 'dist',
      chunkSizeWarningLimit: 1200,
      // 일반 빌드: 폰트 서브셋을 CSS에 인라인하지 않음 → 렌더 차단 CSS를 가볍게 유지
      assetsInlineLimit: standalone ? 100000000 : 0,
    },
  };
});
