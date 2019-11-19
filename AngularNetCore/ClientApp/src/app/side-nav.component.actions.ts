import { AppSettings } from '../../shared/client-side-models/buildModels';
import { Action } from '../../common/ngAction';

export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppSettings';
  constructor(public name: string, public title: string, public payload: boolean, public playback, public delay: number) { }
}

export class ResponseAppSettings {
  static readonly type = '[side-nav] Response AppSettings';
  constructor(public name: string, public title: string, public payload: AppSettings, public playback: boolean, public delay: number) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public name: string, public title: string, public payload: string, public playback: boolean, public delay: number) {
  }
}

export class SideNavInit {
  static readonly type = '[side-nav] SideNavInit';
  // remove circular reference by using ngAction: any
  constructor(public ngAction: any) { }
}

