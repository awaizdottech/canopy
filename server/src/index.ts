import "dotenv/config"
import { envVariableConfig } from "./config/env-variables.config"
import { connectDB } from "./db/db"
import { app } from "./app"
import { check } from "./dev"

const main = async () => {
  try {
    await connectDB()
  } catch (error) {
    console.error(error)
    process.exit(1)
    // in production we dont end the server as it'll do more than just work with one db, instead we'll notify about the error
  }

  app.listen(envVariableConfig.port, () =>
    console.log(`server running on ${envVariableConfig.port}`)
  )
}

main()
// .then(() => check())
