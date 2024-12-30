import { AppNode } from './app.node';

export enum AppRoutes {
  DASHBOARD = `/${AppNode.AUTHENTICATED}`,
  MEMBER = `${AppRoutes.DASHBOARD}/${AppNode.MEMBER}`,
  MEMBER_DETAIL = `${AppRoutes.MEMBER}/detail/`,
  STAFFLIST = `/${AppNode.STAFF}/${AppNode.LIST}`,
  PUBLIC = `/${AppNode.PUBLIC}`,
}
