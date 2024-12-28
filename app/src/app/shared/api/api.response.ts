export interface ApiResponse {
  result: boolean;
  code: ApiCodeResponse;
  data: any;
  paramError: boolean;
}

// Message à traduire dans le front
export enum ApiCodeResponse {
  TEST = 'api.result.test',
  COMMON_SUCCESS = 'api.success',
  NO_TOKEN_FOUNDED = 'api.security.error.no_token_found',
  USER_NOT_FOUND = 'api.security.error.user_not_found',
  TOKEN_EXPIRED = 'api.security.error.token_expired',
  SIGNUP_ERROR = 'api.security.error.sign-up',
  CREDENTIAL_DELETE_ERROR = 'api.security.error.credential-delete',
  USER_ALREADY_EXIST = 'api.security.error.user-already-exist',
  TOKEN_GEN_ERROR = 'api.security.error.token-gen',
  PAYLOAD_IS_NOT_VALID = 'api.validation.error',
  PAYLOAD_PARAM_IS_MISSING = 'api.validation.param.missing',
  USERNAME_IS_NOT_EMPTY = 'api.error.username.is-not-empty',
  USERNAME_MIN_LENGTH = 'api.error.username.min-length',
  USERNAME_MAX_LENGTH = 'api.error.username.max-length',
  PASSWORD_MIN_LENGTH = 'api.error.password.min-length',
  PASSWORD_MAX_LENGTH = 'api.error.password.max-length',
  PASSWORD_IS_NOT_EMPTY = 'api.error.password.is-not-empty',
  ACCOUNT_SIGNIN_SUCCESS = 'api.account.success',
  ACCOUNT_SIGNUP_SUCCESS = 'api.signup.success',

  MEMBER_PAYLOAD_MEMBER_ID_MANDATORY = 'api.error.member-id.missing',
  MEMBER_PAYLOAD_MEMBER_ID_LENGTH_ERROR = 'api.error.member-id.length',
  MEMBER_PAYLOAD_FIRSTNAME_IS_NOT_STRING = 'api.error.firstname.is-not-string',
  MEMBER_PAYLOAD_FIRSTNAME_LENGTH_ERROR = 'api.error.firstname.length',
  MEMBER_PAYLOAD_LASTNAME_IS_NOT_STRING = 'api.error.lastname.is-not-string',
  MEMBER_PAYLOAD_LASTNAME_LENGTH_ERROR = 'api.error.lastname.length',
  MEMBER_PAYLOAD_BIRTHDATE_IS_NOT_VALID = 'api.error.birthdate.is-not-valid',
  MEMBER_PAYLOAD_GENDER_IS_NOT_VALID = 'api.error.gender.is-not-valid',
  MEMBER_PAYLOAD_MAIL_IS_NOT_VALID = 'api.error.mail.is-not-valid',
  MEMBER_PAYLOAD_MAIL_LENGTH_ERROR = 'api.error.mail.length',
  MEMBER_PAYLOAD_PHONE_LENGTH_ERROR = 'api.error.phone.length',
  MEMBER_PAYLOAD_IBAN_LENGTH_ERROR = 'api.error.iban.length',
  MEMBER_PAYLOAD_ACTIVATION_CODE_LENGTH_ERROR = 'api.error.activation-code.length',
  MEMBER_PAYLOAD_SUBSCRIPTION_NOT_VALID = 'api.error.subscription.not-valid',
  MEMBER_PAYLOAD_ACTIVE_INVALID = 'api.error.active.not-valid',
  MEMBER_CREATE_ERROR='api.error.member-creation',
  MEMBER_DELETE_ERROR='api.error.member-delete',
  MEMBER_NOT_FOUND='api.error.member-not-found',
  MEMBER_UPDATE_ERROR='api.error.member-update',
  MEMBERPLAN_CREATE_ERROR='api.error.memberplan-creation',
  MEMBERPLAN_DELETE_ERROR='api.error.memberplan-delete',
  MEMBERPLAN_NOT_FOUND='api.error.memberplan-not-found',
  MEMBERPLAN_UPDATE_ERROR='api.error.memberplan-update',
}
