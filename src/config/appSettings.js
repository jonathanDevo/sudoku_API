export const appSettings = {
    apiUrl: import.meta.env.VITE_API_URL,
    dificultad: import.meta.env.VITE_DEFAULT_DIFFICULTY,
    isDev: import.meta.env.MODE === "development",
    isProd: import.meta.env.MODE === "production",
  };
  