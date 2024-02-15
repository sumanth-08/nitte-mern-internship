import multer from "multer";

const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "./public/uploads");
  //   },
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, uniqueSuffix + ext);
  },
});

const limit = 1024 * 1024 * 2;

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes("jpeg") && !file.mimetype.includes("png")) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const uploads = multer({
  storage: storage,
  limits: { fileSize: limit },
  fileFilter: fileFilter,
});

export default uploads;
