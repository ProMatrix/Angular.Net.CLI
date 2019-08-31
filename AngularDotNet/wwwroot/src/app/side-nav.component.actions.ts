import { AppSettings } from '../../shared/client-side-models/buildModels';

export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppSettings';
  constructor(public payload: boolean) { }
}

export class ResponseAppSettings {
  static readonly type = '[side-nav] Response AppSettings';
  constructor(public payload: AppSettings) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public payload: string) { }
}

export class RequestStateInit {
  static readonly type = '[side-nav] StateInit';
  constructor(public payload: boolean) { }
}

export class RequestStateReset {
  static readonly type = '[side-nav] StateReset';
  constructor(public payload: boolean) { }
}
