const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
  UNKNOWN_ERROR: {
    code: 500,
    message: "Something went wrong!",
  },
  REQUIRED_PARAM: {
    code: 201,
    message: "is required",
  },
  INVALID_DATA: {
    code: 202,
    message: "is invalid params",
  },
  ALREADY_EXIST: {
    code: 203,
    message: "is already exist",
  },
  MULTER_ERR: {
    code: 204,
    message: "",
  },
  NOT_MATCH: {
    code: 205,
    message: "is not match",
  },
  TOKEN_REQUIRED: {
    code: 400,
    message: "Authentication token is required",
  },
  INVALID_TOKEN: {
    code: 401,
    message: "Authentication token is invalid",
  },
};

export default RESPONSE;
