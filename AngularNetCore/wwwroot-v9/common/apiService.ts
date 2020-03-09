import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgAction } from './ngAction';
import { Store } from '@ngxs/store';

export class ApiService {
  private readonly serverError = 'Server could be busy or offline!';
  downloadTimeout = 45000;
  uploadTimeout = 45000;
  ngAction: NgAction;

  constructor(public http: HttpClient, public store: Store) {
    this.ngAction = NgAction.getInstance(store);
  }

  //#region httpRequest
  private httpRequest(
    obj: object,
    requestType: string,
    responseType$: string,
    url: string,
    success: (x: any) => any,
    error: (x: string) => string,
    params$?: HttpParams, headers$?: HttpHeaders,
    progressCallback?: (x: any) => any) {
    const reportProgress$ = (progressCallback !== undefined && progressCallback !== null);
    let request: HttpRequest<any>;
    if (obj) {
      request = new HttpRequest(requestType, url, obj, { reportProgress: reportProgress$, headers: headers$, params: params$ });
    } else {
      request = new HttpRequest(
        requestType, url,
        {
          responseType: responseType$,
          reportProgress: reportProgress$,
          headers: headers$, params: params$
        });
    }

    let timerId = null;
    const httpSubscription = this.http.request(request).subscribe((event: HttpEvent<any>) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        clearTimeout(timerId);
        timerId = null;
        httpSubscription.unsubscribe();
        error(this.serverError);
      }, this.downloadTimeout);

      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.DownloadProgress:
          if (requestType === 'Get') {
            if (progressCallback(event)) {
              clearTimeout(timerId);
              httpSubscription.unsubscribe();
            }
          }
          break;
        case HttpEventType.UploadProgress:
          if (requestType === 'Post') {
            if (progressCallback(event)) {
              clearTimeout(timerId);
              httpSubscription.unsubscribe();
            }
          }
          break;
        case HttpEventType.Response:
          clearTimeout(timerId);
          httpSubscription.unsubscribe();
          if (event.body instanceof Blob) {
            success(event);
          } else {
            success(event.body);
          }
          break;
      }
    },
      (errorResponse: HttpErrorResponse) => {
        clearTimeout(timerId);
        httpSubscription.unsubscribe();
        if (errorResponse.error.ExceptionMessage) {
          error(errorResponse.error.ExceptionMessage);
        } else {
          error(errorResponse.error);
        }
      }
    );
  }
  //#endregion

  //#region http get
  get(
    url: string,
    success: (x: any) => any,
    error: (x: string) => any,
    params?: HttpParams,
    headers?: HttpHeaders,
    progressCallback?: (x: any) => any) {
    this.httpRequest(null, 'Get', 'json', url, success, error, params, headers, progressCallback);
  }

  download(
    url: string,
    success: (x: any) => any,
    error: (x: string) => any,
    params?: HttpParams,
    headers?: HttpHeaders,
    progressCallback?: (x: any) => any) {
    this.httpRequest(null, 'Get', 'blob' as 'json', url, success, error, params, headers, progressCallback);
  }
  //#endregion

  //#region http post
  post(
    object$: object,
    url: string,
    success: (x: any) => any,
    error: (x: string) => any,
    params?: HttpParams,
    headers?: HttpHeaders,
    progressCallback?: (x: any) => any) {
    this.httpRequest(object$, 'Post', 'json', url, success, error, params, headers, progressCallback);
  }

  upload(
    files: Array<File>,
    url: string,
    success: (x: any) => any,
    error: (x: string) => any,
    params?: HttpParams,
    headers?: HttpHeaders,
    progressCallback?: (x: any) => any) {
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }
    this.post(formData, url, success, error, params, headers, progressCallback);
  }
  //#endregion

  //#region http delete
  delete(
    url: string,
    success: (x: any) => any,
    error: (x: string) => any,
    params?: HttpParams,
    headers?: HttpHeaders,
    progressCallback?: (x: any) => any) {
    this.httpRequest(null, 'Delete', 'json', url, success, error, params, headers, progressCallback);
  }
  //#endregion

  //#region save file
  saveFile(blob: Blob, filename: string) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  }

  private handleError(customResponse: any, caught: Observable<any>): any {
    // do something to capture the error for reporting purposes
    throw customResponse.error;
  }
  //#endregion

  setLocalStorage(name: string, anyObject: any): void {
    if (anyObject instanceof Array) {
      anyObject = { array: anyObject };
    }
    if (typeof (anyObject) === 'object') {
      const stringVal = JSON.stringify(anyObject, null, 2);
      if (stringVal) {
        localStorage.setItem(name, stringVal);
      }
    }
  }

  getLocalStorage(name: string): any {
    const value = localStorage.getItem(name);
    if (!value) {
      return null;
    }
    if (value.substring(0, 1) === '{') {
      const obj: any = JSON.parse(value);
      if ('array' in obj) {
        return obj.array;
      }
      return obj;
    }
    return null;
  }

  private filterFileNameChar(key): boolean {
    const illegalCharacters = ' \ / : * ? " < > | ';
    if (illegalCharacters.includes(key)) {
      return false;
    } else {
      return true;
    }
  }

  filterProjectNameChar(charCode: number): boolean {
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
      return true;
    else
      return false;
  }
}
