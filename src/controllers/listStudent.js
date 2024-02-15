import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
import studentModel from "../model/studentModel.js";
import { CONTENT_STATE } from "../configs/constants.js";
import authenticate from "../middlewares/authentication.js";
const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    let page = Number(req.query.page) ? Number(req.query.page) : 1;
    let limit = Number(req.query.limit) ? Number(req.query.limit) : 10;

    console.log(req.user.email);

    let data = await studentModel
      .find({
        isactive: CONTENT_STATE.IS_ACTIVE,
        teacherData: req.user.id,
      })
      .populate("teacherData")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    data = data.map((itm) => ({
      user_id: itm._id,
      name: itm.name,
      phone: itm.phone,
      email: itm.email,
      rollno: itm.rollno,
      profile: `/uploads/` + itm.profile,
      teacherData: {
        teacherId: itm.teacherData._id,
        name: itm.teacherData.teachername,
        phone: itm.teacherData.phone,
      },
    }));

    return send(res, RESPONSE.SUCCESS, data);
  } catch (err) {
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
