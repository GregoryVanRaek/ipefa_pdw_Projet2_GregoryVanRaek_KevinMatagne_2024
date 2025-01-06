import {inject, Injectable} from '@angular/core';
import {ApiService} from '@shared/api';
import {ApiResponse} from '@shared/api/api.response';
import {Contract} from '@shared/api/data/model/contract';
import {AppNode, AppRoutes} from '../../../common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  api :ApiService = inject(ApiService)

  create(payload :Contract) :Observable<ApiResponse>{
    return this.api.post(AppNode.CONTRACT, payload);
  }

  get(id :string) :Observable<ApiResponse>{
    return this.api.get(`${AppNode.CONTRACT}/${AppNode.DETAIL}/${id}`);
  }

  update(payload :Contract) :Observable<ApiResponse>{
    return this.api.put(`${AppNode.CONTRACT}/${AppNode.UPDATE}`, payload);
  }

  delete(id :string) :Observable<ApiResponse>{
    return this.api.delete(`${AppNode.CONTRACT}/${AppNode.DELETE}/${id}`);
  }

}
