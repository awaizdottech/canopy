import pgPromise from "pg-promise"
import { db } from "../../../db/db"

class CartRepoLayer {
  private db: pgPromise.IDatabase<any>

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  getCart = async (userId: string) =>
    this.db.manyOrNone('select * from "cartItems" where user_id=$1', [userId])

  addToCart = async () => this.db.manyOrNone("")
}

export const cartRepoLayer = new CartRepoLayer(db)
