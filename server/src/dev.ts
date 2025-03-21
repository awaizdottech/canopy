import { db } from "./db/db"

const check = async () => {
  try {
    console.log(
      "yo"
      // await db.one(`ALTER TABLE users ALTER COLUMN "roleId" SET DEFAULT 1;`)
    )
  } catch (error) {
    console.log(error)
  }
}

export { check }
