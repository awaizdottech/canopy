const getEnvVariableString = (key: string, defaultValue?: string) => {
  if (!process.env[key]) {
    if (defaultValue) return defaultValue
    throw Error(`missing required env variable: ${key}`)
  }
  return process.env[key]
}

const getEnvVariableNumber = (key: string, defaultValue?: number) => {
  if (!process.env[key]) {
    if (defaultValue) return defaultValue
    throw Error(`missing required env variable: ${key}`)
  }

  const value = Number(process.env[key])
  if (isNaN(value)) throw Error(`env variable ${key} must be number`)
  return value
}

export const envVariableConfig = {
  nodeEnv: getEnvVariableString("NODE_ENV", "development"),
  port: getEnvVariableNumber("PORT", 3000),
  accessTokenSecret: getEnvVariableString("ACCESS_TOKEN_SECRET"),
  accessTokenExpiry: getEnvVariableNumber(
    "ACCESS_TOKEN_EXPIRY_MILLIS",
    86400000
  ), // 1 day
  refreshTokenSecret: getEnvVariableString("REFRESH_TOKEN_SECRET"),
  refreshTokenExpiry: getEnvVariableNumber(
    "REFRESH_TOKEN_EXPIRY_MILLIS",
    604800000
  ), // 1 week
  cookieSecret: getEnvVariableString("COOKIE_SECRET"),
  corsOrigin: getEnvVariableString("CORS_ORIGIN"),
  dataLimit: getEnvVariableString("DATA_LIMIT", "16kb"),
  // db variables from here
  dbUsername: getEnvVariableString("DB_USERNAME"),
  dbPassword: getEnvVariableString("DB_PASSWORD"),
  dbHost: getEnvVariableString("DB_HOST"),
  dbPort: getEnvVariableNumber("DB_PORT", 5432), // default to postgreSQL default port
  dbName: getEnvVariableString("DB_NAME"),
  dbQueryTimeout: getEnvVariableNumber("DB_QUERY_TIMEOUT_MILLIS", 3000), // default 3s
  dbConnectionTimeout: getEnvVariableNumber(
    "DB_CONNECTION_TIMEOUT_MILLIS",
    3000
  ), // default 3s
  dbConnectionRetries: getEnvVariableNumber("DB_CONNECTION_RETRIES", 3), // default 3 retries
  dbConnectionRetryDelay: getEnvVariableNumber(
    "DB_CONNECTION_RETRY_DELAY_MILLIS",
    3000
  ), // default 3s
}
