import { app } from "./app"
import { connectDB } from "./db/db"

const main = async () => {
  app.listen(process.env.PORT, () =>
    console.log(`server running on ${process.env.PORT}`)
  )
  connectDB()
}

main()
