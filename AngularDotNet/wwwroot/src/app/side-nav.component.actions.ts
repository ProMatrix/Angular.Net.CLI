import { AppSettings } from '../../shared/client-side-models/buildModels';

export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppSettings';
  constructor(public payload: boolean, public playback) { }
}

export class ResponseAppSettings {
  static readonly type = '[side-nav] Response AppSettings';
  constructor(public payload: AppSettings, public playback) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public payload: string, public playback: boolean, public date: Date) { }
}

export class SideNavInit {
  static readonly type = '[side-nav] SideNavInit';
  constructor(public actionQueue: Array<any>) { }
}

