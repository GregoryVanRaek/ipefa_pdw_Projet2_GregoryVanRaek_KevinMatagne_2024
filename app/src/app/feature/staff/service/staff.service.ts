import {inject, Injectable} from '@angular/core';
import {ApiService} from '@shared/api';
import {map, Observable} from 'rxjs';
import {ApiResponse} from '@shared/api/api.response';
import {Employee} from '@shared/api/data/model/employee';
import { AppRoutes} from '../../../common';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private api :ApiService = inject(ApiService);

  getAllEmployees() :Observable<Employee[]> {
    return this.api.get(AppRoutes.STAFFLIST).pipe(
      map((response) => {return response.data as Employee[];}),
    );
  }

  getEmployeeById(id:string): Observable<ApiResponse>{
    return this.api.get(`${AppRoutes.STAFFDETAIL}/${id}`);
  }

  getEmployeeByMail(mail :string) :Observable<ApiResponse>{
    return this.api.get(`${AppRoutes.STAFFMAIL}/${mail}`);
  }

  updateEmployee(payload :Employee) : Observable<ApiResponse>{
    return this.api.put(`${AppRoutes.STAFFUPDATE}`, payload);
  }

  deleteEmployee(id:string) : Observable<ApiResponse>{
    return this.api.delete(`${AppRoutes.STAFFDELETE}/${id}`)
  }

  createEmployee(payload :Employee) : Observable<ApiResponse>{
    return this.api.post(AppRoutes.STAFFCREATE, payload);
  }
}
