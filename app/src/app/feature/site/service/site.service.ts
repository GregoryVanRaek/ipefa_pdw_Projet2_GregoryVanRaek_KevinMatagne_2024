import {inject, Injectable} from '@angular/core';
import {ApiService, Site} from '@shared/api';
import {map, Observable} from 'rxjs';
import {AppRoutes} from '../../../common';
import {ApiResponse} from '@shared/api/api.response';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private readonly api: ApiService = inject(ApiService);

  getAllSites():Observable<Site[]>{
    return this.api.get(AppRoutes.SITELISTBYNAME).pipe(
      map((response)=>response.data as Site[]),
    )
  }
  updateSite(payload :Site) : Observable<ApiResponse>{
    return this.api.put(`${AppRoutes.SITEUPDATE}`, payload);
  }

  deleteSite(id:string) : Observable<ApiResponse>{
    return this.api.delete(`${AppRoutes.SITEDELETE}/${id}`)
  }

  createSite(payload :Site) : Observable<ApiResponse>{
    return this.api.post(AppRoutes.SITECREATE, payload);
  }

  getSiteById(id:string): Observable<ApiResponse>{
    return this.api.get(`${AppRoutes.SITEDETAIL}/${id}`);
  }

}
