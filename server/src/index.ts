import { app } from "./app"
import "dotenv/config"
import { connectDB } from "./db/postgre/db"

// connectDB()
//   .then(() =>
//     app.listen(process.env.PORT, () =>
//       console.log(`server running on ${process.env.PORT}`)
//     )
//   )
//   .catch(err => console.log("postgre connection error", err))

const main = async () => {
  app.listen(process.env.PORT, () =>
    console.log(`server running on ${process.env.PORT}`)
  )
  await connectDB()
}

main()
