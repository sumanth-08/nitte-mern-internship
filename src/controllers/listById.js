import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
import studentModel from "../model/studentModel.js";
const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let data = await studentModel.findById(id);

    data = {
      user_id: data._id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      rollno: data.rollno,
    };

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
