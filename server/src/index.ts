import { app } from "./app"
import "dotenv/config"
import { connectDB } from "./db/db"
import pgPromise from "pg-promise"

let db: pgPromise.IDatabase<any>

const main = async () => {
  app.listen(process.env.PORT, () =>
    console.log(`server running on ${process.env.PORT}`)
  )
  db = connectDB()
}

main()
export { db }
