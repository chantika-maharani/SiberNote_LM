import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import envVariable from "../utils/ENV.js";
import response from "../utils/response.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return response.userError(
        res,
        "email, username, dan password wajib diisi",
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.userError(res, "email sudah terdaftar");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const payload = { userId: user._id };
    const token = jwt.sign(payload, envVariable.JWT_KEY, { expiresIn: "1h" });

    return response.requestSuccessWithData(
      res,
      "berhasil buat user",
      { token },
      201,
    );
  } catch (error) {
    return response.serverError(res, "gagal register user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return response.userError(res, "email dan password wajib diisi");
    }

    const user = await User.findOne({ email });
    if (!user || !(await verifyPassword(password, user.password))) {
      return response.userError(res, "email atau password salah");
    }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, envVariable.JWT_KEY, { expiresIn: "1h" });

    return response.requestSuccessWithData(
      res,
      "berhasil login",
      { token },
      200,
    );
  } catch (error) {
    return response.serverError(res, "gagal login user");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return response.userError(res, "tidak terautentikasi");
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return response.notFoundError(res, "user tidak ketemu");
    }

    return response.requestSuccessWithData(
      res,
      "berhasil get data user",
      { user },
      200,
    );
  } catch (error) {
    return response.serverError(res, "gagal get data user");
  }
};

const hashPassword = async (plainPassword: string) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
