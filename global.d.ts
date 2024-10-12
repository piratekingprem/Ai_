declare namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string; // Add your required env variables here
      NODE_ENV: 'development' | 'production' | 'test'; // Add other env variables if needed
    }
  }
  