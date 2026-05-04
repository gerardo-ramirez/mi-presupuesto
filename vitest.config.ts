// vitest.config.ts
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true, // Permite usar 'describe', 'it', 'expect' sin importarlos
      environment: 'jsdom', // Simula el navegador
      setupFiles: ['./src/test/setup.ts'], // Archivo de configuración inicial
      include: ['src/**/*.test.{ts,tsx}'], // Dónde buscar los tests
    },
  })
);