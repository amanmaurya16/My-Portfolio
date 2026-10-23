import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Support custom base path via VITE_BASE_PATH, GITHUB_ACTIONS env, or default to root '/' (Netlify / custom domains)
  // When building in GitHub Actions CI for GitHub Pages without an override, use the repository subpath '/My-Portfolio/'
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const basePath = process.env.VITE_BASE_PATH ?? (isGitHubActions ? '/My-Portfolio/' : '/');

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve('index.html'),
          admin: path.resolve('admin.html'),
        },
      },
    },
    server: {
      port: 3000,
    },
  };
});
