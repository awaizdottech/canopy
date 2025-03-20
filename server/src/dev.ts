import { db } from "./db/db"

const check = async () => {
  try {
    console.log(
      "yo"
      // await db.one("select role from roles where id=$1", [1])
    )
  } catch (error) {
    console.log(error)
  }
}

export { check }
