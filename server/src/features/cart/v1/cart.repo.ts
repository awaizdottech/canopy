import pgPromise from "pg-promise"
import { db } from "../../../db/db"

type GetCartResponse =
  | { id: number; productId: number; quantity: number; userId: number }[]
  | []

type AddToCartResponse = GetCartResponse

class CartRepoLayer {
  private db: pgPromise.IDatabase<any>

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  getCart = async (userId: number): Promise<GetCartResponse> =>
    this.db.manyOrNone(
      'select id,"productId","userId",quantity from "cartItems" where "userId"=$1 and deleted=false',
      [userId]
    )

  addToCart = async (
    cart: { productId: number; quantity: number; userId: number }[]
  ): Promise<AddToCartResponse> => {
    const { ColumnSet, insert } = pgPromise().helpers

    const query = () =>
      insert(
        cart,
        new ColumnSet(["productId", "quantity", "userId"], {
          table: "cartItems",
        })
      ) + ' returning id,"productId","userId",quantity'

    return this.db.many(query)
  }
}

export const cartRepoLayer = new CartRepoLayer(db)
