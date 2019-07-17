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

  downloadWithProgress(success: Function, error: Function, fileName: string, progressCallback?: Function) {
    this.download(environment.api.download,
      (response: HttpResponse<any>) => {
        this.saveFile(new Blob([response.body]), fileName);
        success();
      },
      error, new HttpParams().set("fileName", fileName), null, (event: HttpProgressEvent) => {
        if (progressCallback) {
          return progressCallback(event);
        }
      });
  }

  postObject(success: Function, error: Function) {
    this.post({ fileId: 123, fileName: "fileName" }, environment.api.postEntity, (response: HttpResponse<any>) => { success(response.body); }, error);
  }

  postCollection(success: Function, error: Function) {
    this.post([{ fileId: 123, fileName: "fileName1" }, { fileId: 456, fileName: "fileName2" }, { fileId: 789, fileName: "fileName3" }], environment.api.postCollection, (response: HttpResponse<any>) => { success(response.body); }, error);
  }

  postCollectionWithProgess(success: Function, error: Function, progressCallback?: Function) {
    const collection = [{ fileId: 123, fileName: "fileName1" }, { fileId: 456, fileName: "fileName2" }, { fileId: 789, fileName: "fileName3" }]
    this.post(collection, environment.api.postCollection, (response: HttpResponse<any>) => { success(response.body); }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        progressCallback(event);
      }
    });
  }

  uploadFile(files: Array<File>, success: Function, error: Function, progressCallback?: Function) {
    this.upload(files, environment.api.upload, (response: HttpResponse<any>) => {
      success(response.body);
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        progressCallback(event);
      }
    });
  }

  uploadFileWithProgess(files: Array<File>, success: Function, error: Function, progressCallback?: Function) {
    this.upload(files, environment.api.upload, () => {
      success();
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        return progressCallback(event);
      }
    });
  }

  deleteObject(success: Function, error: Function, id: string) {
    this.delete(environment.api.deleteEntity,
      (response: HttpResponse<any>) => { success(response.body); }, error, new HttpParams().set("id", id));
  }

}
