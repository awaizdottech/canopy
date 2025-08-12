const getEnvVariableString = (key: string, defaultValue?: string) => {
  let value: string | undefined

  switch (key) {
    case "VITE_BACKEND_URL":
      value = import.meta.env.VITE_BACKEND_URL
      break
    case "VITE_API_TIMEOUT_MILLIS":
      value = import.meta.env.VITE_API_TIMEOUT_MILLIS
      break
    case "VITE_API_RETRY_COUNT":
      value = import.meta.env.VITE_API_RETRY_COUNT
      break
    case "VITE_SNACKBAR_AUTO_HIDE_DURATION_MILLIS":
      value = import.meta.env.VITE_SNACKBAR_AUTO_HIDE_DURATION_MILLIS
      break
  }

  if (!value) {
    if (defaultValue !== undefined) return defaultValue
    throw Error(`missing required env variable: ${key}`)
  }

  return value
}

const getEnvVariableNumber = (key: string, defaultValue?: number) => {
  const stringValue = defaultValue ?? getEnvVariableString(key)
  const numValue = Number(stringValue)

  if (isNaN(numValue)) {
    throw Error(`env variable ${key} must be a number, got`)
  }

  return numValue
}

export const envVariablesConfig = {
  backendURL: getEnvVariableString("VITE_BACKEND_URL"),
  apiTimeout: getEnvVariableNumber("VITE_API_TIMEOUT_MILLIS"),
  apiRetryCount: getEnvVariableNumber("VITE_API_RETRY_COUNT"),
  snackbarAutoHideDuration: getEnvVariableNumber(
    "VITE_SNACKBAR_AUTO_HIDE_DURATION_MILLIS"
  ),
}
