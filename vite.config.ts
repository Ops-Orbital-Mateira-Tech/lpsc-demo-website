import { defineConfig } from 'vite';

export default defineConfig(async () => {
  // Dynamically import the ESM-only plugin so esbuild/Vite doesn't try to require() it.
  const reactPlugin = (await import('@vitejs/plugin-react')).default;
  return {
    plugins: [reactPlugin()],
    server: {
      port: 5173
    }
  };
});

