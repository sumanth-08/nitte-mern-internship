import express from "express";
import demo from "./src/controllers/addStudent.js";
import listStudents from "./src/controllers/listStudent.js";
import listById from "./src/controllers/listById.js";
import updateStudent from "./src/controllers/updateStudent.js";
import deleteStudent from "./src/controllers/deleteStudent.js";
import searchStudent from "./src/controllers/searchStudent.js";
import signUp from "./src/controllers/signUp.js";
import login from "./src/controllers/login.js";

const router = (app) => {
  app.use(express.json());
  app.use("/api/student/add", demo);
  app.use("/api/student/list", listStudents);
  app.use("/api/student/list/particular", listById);
  app.use("/api/student/update", updateStudent);
  app.use("/api/student/delete", deleteStudent);
  app.use("/api/student/search", searchStudent);
  app.use("/api/user/signup", signUp);
  app.use("/api/user/login", login);
};

export default router;
