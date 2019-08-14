import { AppSettings } from '../../shared/client-side-models/buildModels';

export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppConfig';
  constructor(public payload: boolean) { }
}

export class ResponseAppSettings {
  static readonly type = '[side-nav] Response AppConfig';
  constructor(public payload: AppSettings) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public payload: string) { }
}
