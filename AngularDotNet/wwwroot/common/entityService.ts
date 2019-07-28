import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpProgressEvent } from '@angular/common/http';
import { ApiService } from '../shared/enterprise/apiservice';
import { environment } from '../src/environments/environment';

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

  getAll(success: (x: string) => any, error: (x: string) => any) {
    this.get(environment.api.getAll,
      (library: Array<BookInfo>) => {
        success('Successfully completed GetAll!');
      }, (errorMessage: string) => { error(errorMessage); });
  }

  getFromId(success: (x: string) => any, error: (x: string) => any, fileName: string) {
    this.get(environment.api.getContent,
      (response: any) => {
        success(response.content);
      }, error, new HttpParams().set('fileName', fileName));
  }

  getWithProgress(success: (x: string) => any, error: (x: string) => any, fileName: string, progressCallback?: (x: any) => any) {
    this.get(environment.api.getContent, (response: any) => {
      success(response.content);
    }, error,
      new HttpParams().set('fileName', fileName), null, (event: HttpProgressEvent) => {
        if (progressCallback) {
          progressCallback(event);
        }
      });
  }

  downloadFile(success: (x: string) => any, error: (x: string) => any, id: string) {
    this.download(environment.api.download, (response: HttpResponse<any>) => {
      const fileName = id;
      this.saveFile(new Blob([response.body]), fileName);
      success('Download Complete!');
    }, error,
      new HttpParams().set('fileName', id));
  }

  downloadWithProgress(success: () => any, error: (x: string) => any, fileName: string, progressCallback?: (x: any) => any) {
    this.download(environment.api.download,
      (response: HttpResponse<any>) => {
        this.saveFile(new Blob([response.body]), fileName);
        success();
      },
      error, new HttpParams().set('fileName', fileName), null, (event: HttpProgressEvent) => {
        if (progressCallback) {
          return progressCallback(event);
        }
      });
  }

  postEntity(success: (x: string) => any, error: (x: string) => any) {
    this.post({ id: 123, name: 'A Bedtime Story', summary: 'BORING...' }, environment.api.postEntity, (response: HttpResponse<any>) => {
      success('Successfully completed Post Entity!');
    }, error);
  }

  postCollection(success: (x: string) => any, error: (x: string) => any) {
    this.post([{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
      { id: 456, name: 'An Endless Story', summary: 'Endless...' },
      { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }],
      environment.api.postCollection, (response: HttpResponse<any>) => {
      success('Successfully completed Post Collection!');
    }, error);
  }

  postCollectionWithProgess(success: (x: string) => any, error: (x: string) => any, progressCallback?: (x: any) => any) {
    const collection = [{ id: 123, name: 'A Bedtime Story', summary: 'BORING...' },
      { id: 456, name: 'An Endless Story', summary: 'Endless...' },
      { id: 789, name: 'Happy Ever After', summary: 'Exciting...' }];
    this.post(collection, environment.api.postCollection, (response: HttpResponse<any>) => {
      success('Successfully completed Post with Progress!');
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        progressCallback(event);
      }
    });
  }

  uploadFile(files: Array<File>, success: (x: string) => any, error: (x: string) => any, progressCallback?: (x: any) => any) {
    this.upload(files, environment.api.upload, (response: HttpResponse<any>) => {
      success('Successfully completed Upload Files(s)!');
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        progressCallback(event);
      }
    });
  }

  uploadFileWithProgess(files: Array<File>, success: () => any, error: (x: string) => any, progressCallback?: (x: any) => any) {
    this.upload(files, environment.api.upload, () => {
      success();
    }, error, null, null, (event: HttpProgressEvent) => {
      if (progressCallback) {
        return progressCallback(event);
      }
    });
  }

  deleteEntity(success: (x: string) => any, error: (x: string) => any, id: string) {
    this.delete(environment.api.deleteEntity,
      (response: HttpResponse<any>) => { success(response.body); }, error, new HttpParams().set('id', id));
  }

}
