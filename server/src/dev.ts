import { db } from "./db/db"

const check = async () => {
  try {
    console.log(
      "yo",
      // await db.any(`
      // alter table "cartItems" add column deleted boolean not null default false;
      // `)
    )
  } catch (error) {
    console.log(error)
  }
}

export { check }
