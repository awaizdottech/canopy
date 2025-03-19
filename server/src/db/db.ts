import pgPromise from "pg-promise"
import { envVariableConfig } from "../config/env-variables.config"
let db: pgPromise.IDatabase<any> //TODO:  no anys

export const connectDB = async () => {
  const connectionPool = pgPromise()({
    user: envVariableConfig.dbUsername,
    host: envVariableConfig.dbHost,
    database: envVariableConfig.dbName,
    password: envVariableConfig.dbPassword,
    port: envVariableConfig.dbPort,
    query_timeout: envVariableConfig.dbQueryTimeout,
    connectionTimeoutMillis: envVariableConfig.dbConnectionTimeout,
  })

  for (let i = 0; i < envVariableConfig.dbConnectionRetries; i++) {
    try {
      const connection = await connectionPool.connect()
      db = connectionPool
      connection.done()
      return
    } catch (error) {
      const delay = envVariableConfig.dbConnectionRetryDelay
      console.error(
        `${i + 1}: database connection to pg failed. retrying in ${
          delay / 1000
        }s...`
      )

      if (i == envVariableConfig.dbConnectionRetries - 1)
        throw Error("all retries failed to connect with pg")
      //TODO: instead of just throwing this we attach the error we're getting from db

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

export { db }
