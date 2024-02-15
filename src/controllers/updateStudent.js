import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
import studentModel from "../model/studentModel.js";
const router = Router();

router.put("/:id", async (req, res) => {
  try {
    const { name, roll, phone, email } = req.body;
    const id = req.params.id;

    let update = {};
    if (name || name != undefined) update.name = name;
    if (roll || roll != undefined) update.rollno = roll;

    if (phone) {
      const phonePattern = phone.match(/^((\+91?)|\+)?[7-9][0-9]{9}$/);
      if (phonePattern) {
        update.phone = phone;
      } else {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.INVALID_DATA,
          "phone"
        );
        return send(res, updatedResponse);
      }
    }

    if (email) {
      const emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      if (emailPattern) {
        update.email = email;
      } else {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.INVALID_DATA,
          "email"
        );
        return send(res, updatedResponse);
      }
    }

    await studentModel.findByIdAndUpdate(id, update);

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
