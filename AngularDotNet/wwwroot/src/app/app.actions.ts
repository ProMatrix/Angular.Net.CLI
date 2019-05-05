
export class GetAppConfig {
  static readonly type = '[app] Get AppConfig';
  constructor(public payload: string) { }
}

export class NavigateTo {
  static readonly type = '[app] NavigateTo';
  constructor(public payload: string) { }
}

export class ServiceSuccess {
  static readonly type = '[service] Service Success';
  constructor(public payload: string) { }
}

export class ServiceError {
  static readonly type = '[service] Service Error';
  constructor(public payload: string) { }
}

