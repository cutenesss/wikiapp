enum STATUS_CODE {
  CONFLICT_EMAIL_USER = "CONFLICT_EMAIL_USER",
  BAD_REQUEST_CODE_EXISTS = "BAD_REQUEST_CODE_EXISTS",
  BAD_REQUEST_CODE_EXPIRY = "BAD_REQUEST_CODE_EXPIRY",
  BAD_REQUEST_CODE_WRONG = "BAD_REQUEST_CODE_WRONG",
  BAD_REQUEST_WRONG_OLD_PASSWORD = "BAD_REQUEST_WRONG_OLD_PASSWORD",
  BAD_REQUEST_DUPLICATE_NEW_PASSWORD = "BAD_REQUEST_DUPLICATE_NEW_PASSWORD",
  BAD_REQUEST_EMAIL_VERIFIED = "BAD_REQUEST_EMAIL_VERIFIED",
  CLIENT_ERROR = "CLIENT_ERROR",
  UNAUTHORIZED_WRONG_PASSWORD = "UNAUTHORIZED_WRONG_PASSWORD",
  UNAUTHORIZED_USERNAME_NOT_FOUND = "UNAUTHORIZED_USERNAME_NOT_FOUND",
  BAD_REQUEST_NOT_FOUND = "BAD_REQUEST_NOT_FOUND",
  BAD_REQUEST_INVALID_CODE = "BAD_REQUEST_INVALID_CODE",
  CONFLICT = "CONFLICT",
}
export default STATUS_CODE
