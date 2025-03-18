import pgPromise from "pg-promise"
import { db } from "../../../db/db"

class CartRepoLayer {
  private db: pgPromise.IDatabase<any>

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  getCart = async (userId: string) =>
    this.db.manyOrNone('select * from "cartItems" where user_id=$1', [userId])

  addToCart = async () => {
    const { ColumnSet, insert } = pgPromise().helpers
    const cs = new ColumnSet(["col_a", "col_b"], { table: "tmp" })
    const values = [
      { col_a: "a1", col_b: "b1" },
      { col_a: "a2", col_b: "b2" },
    ]
    const query = () => insert(values, cs) + "returning ..."
    //=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

    return this.db.manyOrNone(query)
  }
}

export const cartRepoLayer = new CartRepoLayer(db)
