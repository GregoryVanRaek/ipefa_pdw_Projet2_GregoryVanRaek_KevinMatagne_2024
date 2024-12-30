export enum AppNode {
  AUTHENTICATED = 'dashboard',
  PUBLIC = 'account',
  REDIRECT_TO_PUBLIC = AppNode.PUBLIC,
  REDIRECT_TO_AUTHENTICATED = AppNode.AUTHENTICATED,
  MEMBER = 'member',
  DETAIL = 'detail/:id',
  STAFF = 'staff',
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
  HOME = 'home',
  LIST = 'list',
  FALL_BACK = '**',
}
