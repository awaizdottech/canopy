import { db } from "."

const check = async () => {
  try {
    // console.log("yo", await db.any(`select * from products;`))
  } catch (error) {
    console.log(error)
  }
}

export { check }
