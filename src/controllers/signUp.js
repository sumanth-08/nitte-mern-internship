import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
const router = Router();
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  try {
    const { teachername, phone, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
      const updtaedResponse = setErrorResponseMsg(
        RESPONSE.NOT_MATCH,
        "password"
      );
      return send(res, updtaedResponse);
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    await userModel.create({
      teachername: teachername,
      phone: phone,
      email: email,
      password: encryptedPass,
    });
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
