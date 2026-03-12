type EnvConfig = {
  DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
};

export const configValidation = (config: Record<string, unknown>): EnvConfig => {
  const required = ['DATABASE_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'] as const;

  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    DATABASE_URL: String(config.DATABASE_URL),
    JWT_ACCESS_SECRET: String(config.JWT_ACCESS_SECRET),
    JWT_REFRESH_SECRET: String(config.JWT_REFRESH_SECRET),
  };
};
