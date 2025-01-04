import {inject, Injectable, WritableSignal} from '@angular/core';
import {ApiService} from '@shared/api';
import {map, Observable, tap} from 'rxjs';
import {ApiResponse} from '@shared/api/api.response';
import {Employee} from '@shared/api/data/model/employee';
import {AppNode, AppRoutes} from '../../../common';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private api :ApiService = inject(ApiService);

  getAllEmployees() :Observable<Employee[]> {
    return this.api.get(AppRoutes.STAFFLIST).pipe(
      map((response) => {return response.data as Employee[];}),
      tap((reponse) => console.log(reponse))
    );
  }

  getEmployeeById(id:string): Observable<ApiResponse>{
    return this.api.get(`${AppRoutes.STAFFDETAIL}/${id}`);
  }

  updateEmployee(payload :Employee) : Observable<ApiResponse>{
    return this.api.put(`${AppRoutes.STAFFUPDATE}`, payload);
  }

}
