import pgPromise from "pg-promise"
import { db } from "../../../db/db"

class CartRepoLayer {
  private db: pgPromise.IDatabase<any>

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  getCart = async (userId: string) =>
    this.db.manyOrNone('select * from "cartItems" where user_id=$1', [userId])

  addToCart = async (
    cart: { productId: string; quantity: number; userId: string }[]
  ) => {
    const { ColumnSet, insert } = pgPromise().helpers
    const cs = new ColumnSet(Object.keys(cart), { table: "cartItems" })
    const query = () =>
      insert(cart, cs) + 'returning id,"productId","userId",quantity'
    //=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

    return this.db.manyOrNone(query)
  }
}

export const cartRepoLayer = new CartRepoLayer(db)
