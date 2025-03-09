import { db } from "."

const check = async () => {
  try {
    console.log(
      "yo"
      // await db.any(`ALTER TABLE orders RENAME TO order_items;`)
    )
  } catch (error) {
    console.log(error)
  }
}

export { check }
