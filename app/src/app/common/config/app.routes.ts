import { AppNode } from './app.node';

export enum AppRoutes {
  DASHBOARD = `/${AppNode.AUTHENTICATED}`,
  MEMBER = `${AppRoutes.DASHBOARD}/${AppNode.MEMBER}`,
  MEMBER_DETAIL = `${AppRoutes.MEMBER}/detail/`,
  STAFFLIST = `${AppNode.EMPLOYEE}/${AppNode.LIST}`,
  STAFFDETAIL =`${AppNode.EMPLOYEE}/${AppNode.DETAIL}`,
  STAFFUPDATE = `${AppNode.EMPLOYEE}/${AppNode.UPDATE}`,
  STAFFDELETE = `${AppNode.EMPLOYEE}/${AppNode.DELETE}`,
  PUBLIC = `/${AppNode.PUBLIC}`,

}
