import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
import studentModel from "../model/studentModel.js";
import { CONTENT_STATE } from "../configs/constants.js";
import authenticate from "../middlewares/authentication.js";
const router = Router();

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    // await studentModel.findByIdAndDelete(id);

    const update = {
      isactive: CONTENT_STATE.NOT_AVTIVE,
    };
    await studentModel.findByIdAndUpdate(id, update);
    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
