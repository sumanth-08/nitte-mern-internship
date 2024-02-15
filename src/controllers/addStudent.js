import { Router } from "express";
import { send, setErrorResponseMsg } from "../helper/responseHelper.js";
import RESPONSE from "../configs/global.js";
import studentModel from "../model/studentModel.js";
import imageUploads from "../middlewares/uploads.js";
import multer from "multer";
import authenticate from "../middlewares/authentication.js";
const uploads = imageUploads.single("image");
const router = Router();

router.post("/", authenticate, async (req, res) => {
  try {
    uploads(req, res, async (err) => {
      // if (!req.file) {
      //   const updatedResponse = setErrorResponseMsg(
      //     RESPONSE.REQUIRED_PARAM,
      //     "Profile"
      //   );
      // return send(res, updatedResponse);
      if (err instanceof multer.MulterError) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.MULTER_ERR,
          err.message
        );
        return send(res, updatedResponse);
      }

      // console.log(req.file);

      const { name, rollno, phone, email } = req.body;
      if (!name || name == undefined) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.REQUIRED_PARAM,
          "name"
        );
        return send(res, updatedResponse);
      }
      if (!rollno || rollno == undefined) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.REQUIRED_PARAM,
          "roll no."
        );
        return send(res, updatedResponse);
      }

      const phonePattern = phone.match(/^((\+91?)|\+)?[7-9][0-9]{9}$/);
      if (!phonePattern || phonePattern.length <= 0) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.INVALID_DATA,
          "phone"
        );
        return send(res, updatedResponse);
      }

      const emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      if (!emailPattern || emailPattern.length <= 0) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.INVALID_DATA,
          "email"
        );
        return send(res, updatedResponse);
      }

      const phoneAlreadyExist = await studentModel.findOne({ phone: phone });
      if (phoneAlreadyExist) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.ALREADY_EXIST,
          "phone"
        );
        return send(res, updatedResponse);
      }

      const emailAlreadyExist = await studentModel.findOne({ email: email });
      if (emailAlreadyExist) {
        const updatedResponse = setErrorResponseMsg(
          RESPONSE.ALREADY_EXIST,
          "email"
        );
        return send(res, updatedResponse);
      }

      await studentModel.create({
        name: name,
        rollno: rollno,
        phone: phone,
        email: email,
        profile: req.file.filename,
        teacherData: req.user.id
      });

      return send(res, RESPONSE.SUCCESS);
    });
  } catch (error) {
    console.log(error.message);
    // return res.send(error.stack);
    return send(res, RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
