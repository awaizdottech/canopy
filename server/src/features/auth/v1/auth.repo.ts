import pgPromise from "pg-promise"
import { db } from "../../../db/db"

export type User = {
  id: number
  username: string
  email: string
  mobile: string
  password: string
  roleId: number
  profilePic: string
  refreshToken: string
  deleted: boolean
}

type CreateUserResponse = {
  id: number
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
      "insert into users(username, email, password, mobile) values (${username}, ${email}, ${password}, ${mobile}) returning id, username, email, mobile;",
      newUser
    )

  getUserByEmailOrMobile = (emailOrMobile: string): Promise<User | null> =>
    this.db.oneOrNone(
      'select id, username, email, mobile, "roleId", "profilePic", password, "refreshToken", deleted from users where email=$1 or mobile=$1',
      [emailOrMobile]
    )

  getUserById = (id: number): Promise<User | null> =>
    this.db.oneOrNone(
      'select id, username, email, mobile, "roleId", "profilePic", password, "refreshToken", deleted from users where id=$1',
      [id]
    )

  updateRefreshToken = (update: {
    userId: number
    value: string | null
  }): Promise<UpdateRefreshTokenResponse> =>
    this.db.one(
      'update users set "refreshToken"=${value} where id=${userId} returning "refreshToken"',
      update
    )
}

export const authRepoLayer = new AuthRepoLayer(db)
