// business logic

import { getUserIfExists } from "./user.repo"
import { loginInputsType, registerInputsType } from "./user.schemas"
import bcrypt from "bcrypt"

export const regitserUser = async (registerInputs: registerInputsType) => {
  try {
    getUserIfExists()
  } catch (error) {
    throw error
  }
}

export const loginUser = async (loginInputs: loginInputsType) => {
  try {
    getUserIfExists()
  } catch (error) {
    throw error
  }
}

// userSchema.pre("save", async function (next) {
//   // never use arrow function, it causes a lot of trouble
//   if (!this.isModified("password")) return next(); // when updating other fields
//   this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       username: this.username,
//       email: this.email,
//       fullname: this.fullname,
//       // we can save anything we want here
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       // only id is saved here
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//   );
// };

export const updateCart = async () => {}

export const updateOrders = async () => {}
