import "dotenv/config"
import { app } from "./app"
import { envVariableConfig } from "./config/env-variables.config"
import { connectDB } from "./db/db"
import { check } from "./dev"

const main = () => {
  app.listen(envVariableConfig.port, () =>
    console.log(`server running on ${envVariableConfig.port}`)
  )

  try {
    connectDB()
  } catch (error) {
    console.error(error)
    process.exit(1)
    // in production we dont end the server as it'll do more than just work with one db, instead we'll notify about the error
  }
}

main()
check()
