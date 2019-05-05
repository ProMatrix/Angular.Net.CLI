
export class GetAppConfig {
  static readonly type = '[app] Get AppConfig';
  constructor(public payload: string) { }
}

export class NavigateTo {
  static readonly type = '[app] NavigateTo';
  constructor(public payload: string) { }
}

