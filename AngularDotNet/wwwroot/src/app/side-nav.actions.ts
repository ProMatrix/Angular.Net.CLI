
export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppConfig';
  constructor(public payload: string) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public payload: string) { }
}

export class ServiceSuccess {
  static readonly type = '[side-nav] Service Success';
  constructor(public payload: string) { }
}

export class ServiceError {
  static readonly type = '[side-nav] Service Error';
  constructor(public payload: string) { }
}

