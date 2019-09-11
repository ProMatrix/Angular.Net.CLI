import { AppSettings } from '../../shared/client-side-models/buildModels';

export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppSettings';
  constructor(public action: string, public name: string, public payload: boolean, public playback, public delay: number) { }
}

export class ResponseAppSettings {
  static readonly type = '[side-nav] Response AppSettings';
  constructor(public action: string, public name: string, public payload: AppSettings, public playback: boolean, public delay: number) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public action: string, public name: string, public payload: string, public playback: boolean, public delay: number) {
  }
}

export class SideNavInit {
  static readonly type = '[side-nav] SideNavInit';
  // remove circular reference by using ngAction: any
  constructor(public ngAction: any) { }
}

