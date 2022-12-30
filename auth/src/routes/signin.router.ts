import jwt from "jsonwebtoken";
import { body } from "express-validator";
import express, { Request, Response } from "express";

import { UserModel } from "../models";
import { Password } from "../services";
import { BadRequestError, validateRequest } from "@lbc-ticketing/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT
    const userJWT = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_KEY!, {
      expiresIn: "100d",
    });

    // Store it on session object
    req.session = { jwt: userJWT };

    return res.status(200).json(existingUser);
  }
);

export { router as signInRouter };
