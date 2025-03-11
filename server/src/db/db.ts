import pgPromise from "pg-promise"

let db: pgPromise.IDatabase<any>

export const connectDB = () => {
  db = pgPromise()({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  })
}

export { db }
