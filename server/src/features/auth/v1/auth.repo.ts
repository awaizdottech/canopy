import pgPromise from "pg-promise"
import { db } from "../../../db/db"

export type User = {
  id: string
  username: string
  email: string
  mobile: string
  password: string
  roleId: string
  profilePic: string
  refreshToken: string
  deleted: boolean
} | null

type CreateUserResponse = {
  id: string
  username: string
  email: string
  mobile: string
}

type UpdateRefreshTokenResponse = { refreshToken: string | null }

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
  }): Promise<CreateUserResponse> =>
    this.db.one(
      "insert into users(username, email, password, mobile) values (${username}, ${email}, ${password},${mobile}) returning id,username, email, mobile;",
      // TODO: make default value of roleId as 1
      newUser
    )

  getUser = (value: string): Promise<User> =>
    this.db.oneOrNone(
      'select id, username, email, mobile, "roleId", "profilePic", password, "refreshToken", deleted from users where email=$1 or mobile=$1 or id=$1',
      [value]
    ) // TODO: 1. this doesnt let me search for email or mobile because its not compatible with the id integer type 2. isnt this less performant than my previous version where I was checking what I got and querying accordingly

  updateRefreshToken = (update: {
    userId: string
    value: string | null
  }): Promise<UpdateRefreshTokenResponse> =>
    this.db.one(
      'update users set "refreshToken"=${value} where id=${userId} returning "refreshToken"',
      update
    )

  // update queries using update clause
}

export const authRepoLayer = new AuthRepoLayer(db)
