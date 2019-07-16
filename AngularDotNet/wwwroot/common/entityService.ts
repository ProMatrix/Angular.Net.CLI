import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams, HttpProgressEvent } from "@angular/common/http";
import { ApiService } from "../shared/enterprise/apiservice";
import { environment } from "../src/environments/environment";

export class BookInfo {
  id: number;
  name: string;
  summary: string;
}

// #endregion
@Injectable()
export class EntityService extends ApiService {

  bookLibrary: Array<BookInfo>;

  constructor(public readonly http: HttpClient) {
    super(http);
  }

  getAll(success: Function, error: Function) {
    this.get(environment.api.getAll,
      (response: HttpResponse<any>) => {
        this.bookLibrary = response.body;
        success("Successfully completed: GetAll");
      }, error);
  }

  getFromId(success: Function, error: Function, fileName: string) {
    this.get(environment.api.getEntity,
      (response: HttpResponse<any>) => {
        success(response.body.content);
      }, error, new HttpParams().set("fileName", fileName));
  }

  getWithProgress(success: Function, error: Function, fileName: string, progressCallback?: Function) {
    this.get(environment.api.getEntity, (response: HttpResponse<any>) => { success(response.body.content); }, error,
      new HttpParams().set("fileName", fileName), null, (event: HttpProgressEvent) => {
        if (progressCallback) {
          progressCallback(event);
        }
      });
  }

  downloadFile(success: Function, error: Function, fileName: string) {
    this.download(environment.api.download, (response: HttpResponse<any>) => {
      this.saveFile(new Blob([response.body]), fileName);
      success("Download Complete!");
    }, error,
      new HttpParams().set("fileName", fileName));
  }

}
