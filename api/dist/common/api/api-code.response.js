"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCodeResponse = void 0;
var ApiCodeResponse;
(function (ApiCodeResponse) {
    ApiCodeResponse["TEST"] = "api.result.test";
    ApiCodeResponse["COMMON_SUCCESS"] = "api.success";
    ApiCodeResponse["NO_TOKEN_FOUNDED"] = "api.security.error.no_token_found";
    ApiCodeResponse["USER_NOT_FOUND"] = "api.security.error.user_not_found";
    ApiCodeResponse["TOKEN_EXPIRED"] = "api.security.error.token_expired";
    ApiCodeResponse["SIGNUP_ERROR"] = "api.security.error.sign-up";
    ApiCodeResponse["CREDENTIAL_DELETE_ERROR"] = "api.security.error.credential-delete";
    ApiCodeResponse["USER_ALREADY_EXIST"] = "api.security.error.user-already-exist";
    ApiCodeResponse["TOKEN_GEN_ERROR"] = "api.security.error.token-gen";
    ApiCodeResponse["PAYLOAD_IS_NOT_VALID"] = "api.validation.error";
    ApiCodeResponse["PAYLOAD_PARAM_IS_MISSING"] = "api.validation.param.missing";
    ApiCodeResponse["USERNAME_IS_NOT_EMPTY"] = "api.error.username.is-not-empty";
    ApiCodeResponse["USERNAME_MIN_LENGTH"] = "api.error.username.min-length";
    ApiCodeResponse["USERNAME_MAX_LENGTH"] = "api.error.username.max-length";
    ApiCodeResponse["PASSWORD_MIN_LENGTH"] = "api.error.password.min-length";
    ApiCodeResponse["PASSWORD_MAX_LENGTH"] = "api.error.password.max-length";
    ApiCodeResponse["PASSWORD_IS_NOT_EMPTY"] = "api.error.password.is-not-empty";
    ApiCodeResponse["ACCOUNT_SIGNIN_SUCCESS"] = "api.account.success";
    ApiCodeResponse["ACCOUNT_SIGNUP_SUCCESS"] = "api.signup.success";
})(ApiCodeResponse || (exports.ApiCodeResponse = ApiCodeResponse = {}));
//# sourceMappingURL=api-code.response.js.map