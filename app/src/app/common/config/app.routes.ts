import { AppNode } from './app.node';

export enum AppRoutes {
  DASHBOARD = `/${AppNode.AUTHENTICATED}`,
  MEMBER = `${AppRoutes.DASHBOARD}/${AppNode.MEMBER}`,
  MEMBER_DETAIL = `${AppRoutes.MEMBER}/detail/`,
  STAFFLIST = `${AppNode.EMPLOYEE}/${AppNode.LIST}`,
  STAFFMAIL = `${AppNode.EMPLOYEE}/${AppNode.MAIL}`,
  STAFFDETAIL =`${AppNode.EMPLOYEE}/${AppNode.DETAIL}`,
  STAFFUPDATE = `${AppNode.EMPLOYEE}/${AppNode.UPDATE}`,
  STAFFDELETE = `${AppNode.EMPLOYEE}/${AppNode.DELETE}`,
  STAFFCREATE = `${AppNode.EMPLOYEE}/${AppNode.CREATE}`,
  PUBLIC = `/${AppNode.PUBLIC}`,
  CONTRACTCREATE = `${AppNode.CONTRACT}/${AppNode.CREATE}`,

  //SITE
  SITECREATE=`${AppNode.SITE}/${AppNode.CREATE}`,
  SITEDETAIL=`${AppNode.SITE}/${AppNode.DETAIL}`,
  SITEUPDATE=`${AppNode.SITE}/${AppNode.UPDATE}`,
  SITEDELETE=`${AppNode.SITE}/${AppNode.DELETE}`,
  SITELISTBYNAME=`${AppNode.SITE}/${AppNode.LIST}`,
  INVOICEDELETE=`${AppNode.INVOICE}/${AppNode.DELETE}`,
  INVOICEUPDATE=`${AppNode.INVOICE}/${AppNode.UPDATE}`,
  INVOICECREATE=`${AppNode.INVOICE}/${AppNode.CREATE}`,
  INVOICELIST=`${AppNode.INVOICE}/${AppNode.LIST}`,
  INVOICEDETAIL=`${AppNode.INVOICE}/${AppNode.DETAIL}`,
}
