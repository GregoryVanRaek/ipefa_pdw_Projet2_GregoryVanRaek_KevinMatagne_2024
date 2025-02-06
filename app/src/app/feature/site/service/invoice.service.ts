import {ApiService} from '@shared/api';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {AppRoutes} from '../../../common';
import {ApiResponse} from '@shared/api/api.response';
import {Invoice} from '@shared/api/data/model/invoice';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly api: ApiService = inject(ApiService);

  getAllInvoicesBySiteId(siteId:string):Observable<Invoice[]>{
    return this.api.get(`${AppRoutes.INVOICELIST}/${siteId}`).pipe(
      map((response)=>response.data as Invoice[]),
    )
  }
  updateInvoice(payload :Invoice) : Observable<ApiResponse>{
    return this.api.put(`${AppRoutes.INVOICEUPDATE}`, payload);
  }

  deleteInvoice(id:string) : Observable<ApiResponse>{
    return this.api.delete(`${AppRoutes.INVOICEDELETE}/${id}`)
  }

  createInvoice(siteId:string, payload :Invoice) : Observable<ApiResponse>{
    return this.api.post(`${AppRoutes.INVOICECREATE}/${siteId}`, payload);
  }

  getInvoiceById(id:string): Observable<ApiResponse>{
    return this.api.get(`${AppRoutes.INVOICEDETAIL}/${id}`);
  }

}
