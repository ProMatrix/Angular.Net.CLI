import { AppSettings } from '../../shared/client-side-models/buildModels';
import { NgAction } from '../../shared/enterprise/ngAction';

export class RequestAppSettings {
  static readonly type = '[side-nav] Request AppSettings';
  constructor(public name: string, public payload: boolean, public playback) { }
}

export class ResponseAppSettings {
  static readonly type = '[side-nav] Response AppSettings';
  constructor(public name: string, public payload: AppSettings, public playback: boolean) { }
}

export class NavigateTo {
  static readonly type = '[side-nav] NavigateTo';
  constructor(public name: string, public payload: string, public playback: boolean) { }
}

export class SideNavInit {
  static readonly type = '[side-nav] SideNavInit';
  constructor(public name: string, public ngAction: NgAction) { }
}

