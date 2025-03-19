import pgPromise, { PreparedStatement as PS } from "pg-promise"
import { db } from "../../../db/db"

class AuthRepoLayer {
  private db

  constructor(db: pgPromise.IDatabase<any>) {
    this.db = db
  }

  createUser = async (newUser: {
    username: string
    email: string
    password: string
    mobile: string
  }) =>
    this.db.one(
      'insert into users(username, email, password, mobile, "roleId") values (${username}, ${email}, ${password},${mobile},) returning id,username, email, mobile;', // TODO: variable for customer role
      newUser
    )

  getUser = (value: string) =>
    this.db.oneOrNone(
      new PS({
        text: 'select id, username, email, mobile, "roleId", "profilePic" from users where id=$1 or email=$1 or mobile=$1',
        values: [value],
      })
    )

  updateRefreshToken = (update: { userId: string; value: string | null }) =>
    this.db.one(
      'update users set "refreshToken"=${value} where id=${userId} returning "refreshToken"',
      update
    )

  // update queries using update clause
}

export const authRepoLayer = new AuthRepoLayer(db)
