import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { ApiService } from "../shared/enterprise/apiservice";
import { environment } from "../src/environments/environment";

// #endregion
@Injectable()
export class EntityService extends ApiService {

  constructor(public readonly http: HttpClient) {
    super(http);
  }

  getAll(success: Function, error: Function) {
    this.get(environment.api.getAll,
      (response: HttpResponse<any>) => { success(response.body); }, error);
  }
}
