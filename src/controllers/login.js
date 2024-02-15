import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
const router = Router();
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userModel.findOne({ email: email });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      const token = jwt.sign(
        {
          id: userData._id,
          email: userData.email,
          role: userData.role,
        },
        process.env.TOKENKEY,
        {
          expiresIn: "2h"
        }
      );
      return send(res, RESPONSE.SUCCESS, { access_token: token, role: userData.role });
    } else {
      const updatedResponse = setErrorResponseMsg(
        RESPONSE.NOT_MATCH,
        "Email/Password"
      );
      return send(res, updatedResponse);
    }
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
