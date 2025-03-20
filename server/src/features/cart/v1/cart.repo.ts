import pgPromise from "pg-promise"
import { db } from "../../../db/db"

type GetCartResponse =
  | { id: string; productId: string; quantity: number; userId: string }[]
  | []

type AddToCartResponse = GetCartResponse

class CartRepoLayer {
  private db: pgPromise.IDatabase<any>

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  getCart = async (userId: string): Promise<GetCartResponse> =>
    this.db.manyOrNone(
      'select id,"productId","userId",quantity from "cartItems" where "userId"=$1 and deleted=false',
      [userId]
    )

  addToCart = async (
    cart: { productId: string; quantity: number; userId: string }[]
  ): Promise<AddToCartResponse> => {
    const { ColumnSet, insert } = pgPromise().helpers
    const cs = new ColumnSet(["productId", "quantity", "userId"], {
      table: "cartItems",
    })
    const query = () =>
      insert(cart, cs) + ' returning id,"productId","userId",quantity'

    return this.db.manyOrNone(query)
  }
}

export const cartRepoLayer = new CartRepoLayer(db)
