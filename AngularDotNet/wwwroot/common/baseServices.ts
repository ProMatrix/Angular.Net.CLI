import { Observable, pipe, Subscription } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AnalyticsData, Exception, Performance } from "../shared/client-side-models/analyticsData";

export class BaseServices {

  constructor(public readonly http: HttpClient) {
    if (!this.getLocalStorage("analyticsData")) {
      const analyticsData = new AnalyticsData();
      analyticsData.exceptions = new Array<Exception>();
      analyticsData.performances = new Array<Performance>();
      this.setLocalStorage("analyticsData", analyticsData);
    }
  }

  //httpGet(success: Function, error: Function) {
  //  const httpSubscription = this.http.get(this.url).pipe(map((response) => response), catchError(this.handleError)).subscribe(
  //    obj => {
  //      httpSubscription.unsubscribe();
  //      success(obj);
  //    },
  //    (httpErrorResponse) => {
  //      httpSubscription.unsubscribe();
  //      error(httpErrorResponse.ExceptionMessage);
  //    });
  //}

  httpGet(controller: string, success: Function, error: Function, ...parameters: string[]) {
    let httpSubscription: Subscription;
    httpSubscription = this.get(controller, parameters)
      .subscribe(
        obj => {
          httpSubscription.unsubscribe();
          success(obj);
        },
        errorMessage => {
          httpSubscription.unsubscribe();
          error(errorMessage);
        });
  }

  private get(controller: string, parameters: string[]): Observable<any> {
    let endPoint = `api/${controller}`;
    parameters.forEach(parameter => {
      endPoint += `/${parameter}`;
    });
    endPoint = location.origin + "/" + endPoint;
    return this.http.get(endPoint).pipe(map((response) => response), catchError(this.handleError));
  }

  httpPost(controller: string, action: string, object: object, success: Function, error: Function) {
    let httpSubscription: Subscription;
    httpSubscription = this.post(controller, action, object)
      .subscribe(
        obj => {
          httpSubscription.unsubscribe();
          success(obj);
        },
        errorMessage => {
          httpSubscription.unsubscribe();
          error(errorMessage);
        });
  }

  private post(controller: string, action: string, object: any): Observable<any> {
    let endPoint = `api/${controller}`;
    endPoint = location.origin + "/" + endPoint;
    return this.http.post(endPoint + `/${action}`, object).pipe(map((response) => response), catchError(this.handleError));
  }

  httpDelete(controller: string, success: Function, error: Function) {
    let httpSubscription: Subscription;
    httpSubscription = this.delete(controller)
      .subscribe(
        obj => {
          httpSubscription.unsubscribe();
          success(obj);
        },
        errorMessage => {
          httpSubscription.unsubscribe();
          error(errorMessage);
        });
  }

  delete(controller: string) {
    let endPoint = `api/${controller}`;
    endPoint = location.origin + "/" + endPoint;
    return this.http.delete(endPoint + `api/${controller}`).pipe(map((response) => response), catchError(this.handleError));
  }

  handleError(customResponse: any, caught: Observable<any>): any {
    if (customResponse.status !== 0) {
      const analyticsData: AnalyticsData = JSON.parse(localStorage.getItem("analyticsData"));

      if (analyticsData.exceptions.length > 99) {
        analyticsData.exceptions.pop();
      }
      const exception = new Exception(); exception.date = new Date(); exception.errorMessage = customResponse.error;
      analyticsData.exceptions.unshift(exception);
      localStorage.setItem("analyticsData", JSON.stringify(analyticsData, null, 2));
    }
    throw customResponse.error;
  }

  setLocalStorage(name: string, anyObject: any): void {
    if (anyObject instanceof Array) {
      anyObject = { array: anyObject };
    }
    if (typeof (anyObject) == "object") {
      const stringVal = JSON.stringify(anyObject, null, 2);
      if (stringVal)
        localStorage.setItem(name, stringVal);
    }
  }

  getLocalStorage(name: string): any {
    const value = localStorage.getItem(name);
    if (!value)
      return null;
    if (value.substring(0, 1) === "{") {
      const obj: any = JSON.parse(value);
      if ("array" in obj)
        return obj.array;
      return obj;
    }
    return null;
  }
}
