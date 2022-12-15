import express, { Request, Response } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { validateRequest } from "../middlewares";
import { BadRequestError } from "../errors";

const router = express.Router();

router.post(
  "/api/users/sign-up",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isLength({ min: 6, max: 20 }).withMessage("Password must be between 6 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = UserModel.build({ email, password });
    await user.save();

    // Generate JWT
    const userJWT = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY!, { expiresIn: "1d" });

    // Store it on session object
    req.session = { jwt: userJWT };

    return res.status(201).json(user);
  }
);

export { router as signUpRouter };
