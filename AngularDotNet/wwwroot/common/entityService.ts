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

  postEntity(success: Function, error: Function) {
    this.post({ id: 754566, name: "An Awesome Book", summary: "A continuation from before!" }, environment.api.postEntity, (response: HttpResponse<any>) => {
      success("Successfully completed: Post Entity");
    }, error);
  }

  postCollection(success: Function, error: Function) {
    this.post([{ id: 754566, name: "An Awesome Book", summary: "A continuation from before!" }, { id: 854522, name: "The Real Deal", summary: "Love that cover... Nothing more." }, { id: 167435, name: "PayPal Roses", summary: "Read the book for the detals on how to begin." }], environment.api.postCollection, (response: HttpResponse<any>) => {
      success("Successfully completed: Post Collection");
    }, error);
  }

  postCollectionWithProgess(success: Function, error: Function, progressCallback?: Function) {
    const collection = [{ id: 754566, name: "An Awesome Book", summary: "A continuation from before!" }, { id: 854522, name: "The Real Deal", summary: "Love that cover... Nothing more." }, { id: 167435, name: "PayPal Roses", summary: "Read the book for the detals on how to begin." }];
    this.post(collection, environment.api.postCollection, (response: HttpResponse<any>) => {
      success("Successfully completed: Post with Progress");
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        progressCallback(event);
      }
    });
  }

  uploadFile(files: Array<File>, success: Function, error: Function, progressCallback?: Function) {
    this.upload(files, environment.api.upload, (response: HttpResponse<any>) => {
      success("Successfully completed: Upload File(s)");
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        progressCallback(event);
      }
    });
  }

  uploadFileWithProgess(files: Array<File>, success: Function, error: Function, progressCallback?: Function) {
    this.upload(files, environment.api.upload, () => {
      success("Successfully completed: Upload / Progress Dialog");
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        return progressCallback(event);
      }
    });
  }

  deleteEntity(success: Function, error: Function, id: string) {
    this.delete(environment.api.deleteEntity,
      (response: HttpResponse<any>) => {
        success("Successfully completed: Delete Entity");
      }, error, new HttpParams().set("id", id));
  }

}
