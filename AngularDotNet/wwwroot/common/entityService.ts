import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpProgressEvent } from '@angular/common/http';
import { ApiService } from '../shared/enterprise/apiService';
import { environment } from '../src/environments/environment';
import { Action } from '../shared/enterprise/ngAction'; 

// ngxs
import { Store } from '@ngxs/store';

export class BookInfo {
  id: number;
  name: string;
  summary: string;
}

// ???


// #endregion
@Injectable()
export class EntityService extends ApiService {

  bookLibrary: Array<BookInfo>;
  fileBlob: Blob;

  constructor(public store: Store, public http: HttpClient) {
    super(http, store);
  }

  getAll(success: (library: Array<BookInfo>) => any, error: (x: string) => any) {
    this.get(environment.api.getAll,
      (library: Array<BookInfo>) => {
        success(library);
      }, (errorMessage: string) => { error(errorMessage); });
  }

  getAllLocally(success: (library: Array<BookInfo>) => any, error: (x: string) => any) {
    this.get(environment.api.getAllLocally,
      (library: Array<BookInfo>) => {
        success(library);
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

  downloadFile(success: (x: Blob) => any, error: (x: string) => any, fileName: string) {
    this.download(environment.api.download, (response: HttpResponse<any>) => {
      const fileBlob = new Blob([response.body], { type: 'text/plain' });
      success(fileBlob);
    }, error,
      new HttpParams().set('fileName', fileName));
  }

  samplePayload(blob: Blob, type, success: (x: string) => any, error: (x: string) => any) {
    const file = new File([blob], 'simple.txt', { type });

    const files = new Array<File>();
    files.push(file);

    this.upload(files, environment.api.samplePayload, (response: HttpResponse<any>) => {
      success('Successfully completed Upload Payload Sample!');
    }, error, null, null, (event: HttpProgressEvent) => {
    });
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
      (response: HttpResponse<any>) => {
        success('Successfully deleted entity!');
      }, error, new HttpParams().set('id', id));
  }

  saveActionsQueue(success: (x: string) => any, error: (x: string) => any) {
    this.post({ fileName: 'actionsQueue003.json', actions: this.ngAction.actionsQueue },
      environment.api.saveActionsQueue, (response: HttpResponse<any>) => {
      success('Successfully saved the Actions Queue!');
    }, error);
  }

  loadActionsQueue(success: (x: string) => any, error: (x: string) => any, fileName: string) {
    this.get(environment.api.loadActionsQueue,
      (actionsQueue: Array<Action>) => {

        const newActionsArray = new Array<Action>();

        actionsQueue.forEach(action => {

          let newAction = eval("class NavigateTo { }; new NavigateTo();");


          //let classNameString = 'MoreInfo';
          //let myObject = eval('new ' + classNameString + '();');

          //let newAction = eval('new ' + action.name + '();');

          newAction.delay = action.delay - 0;
          newAction.name = action.name;
          newAction.payload = action.payload;
          newAction.playback = action.playback;

          newActionsArray.push(newAction);
        });

        this.ngAction.actionsQueue = newActionsArray;
        let bp = 0;

        success('Successfully saved the Actions Queue!');
      }, error, new HttpParams().set('fileName', fileName));
  }

}
