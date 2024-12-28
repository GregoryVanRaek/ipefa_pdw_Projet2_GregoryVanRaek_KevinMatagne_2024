import { AppNode } from './app.node';

export enum AppRoutes {
  DASHBOARD = `/${AppNode.AUTHENTICATED}`,
  MEMBER = `${AppRoutes.DASHBOARD}/${AppNode.MEMBER}`,
  MEMBER_DETAIL = `${AppRoutes.MEMBER}/detail/`,
  PUBLIC = `/${AppNode.PUBLIC}`,
}
