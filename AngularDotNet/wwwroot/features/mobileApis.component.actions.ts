import { NgAction } from '../common/ngAction';

export class ChangeTabIndex {
  static readonly type = '[mobileApi] ChangeTabIndex';
  constructor(public name: string, public payload: number, public playback, public date: Date) { }
}

export class ToggleSpellChecking {
  static readonly type = '[mobileApi] ToggleSpellChecking';
  constructor(public name: string, public payload: boolean, public playback, public date: Date) { }
}

export class UpdateTextMessage {
  static readonly type = '[mobileApi] UpdateTextMessage';
  constructor(public name: string, public payload: string, public playback, public date: Date) { }
}

export class ClearTextMessage {
  static readonly type = '[mobileApi] ClearTextMessage';
  constructor(public name: string, public payload: boolean, public playback, public date: Date) { }
}

export class ChangeMobileCarrier {
  static readonly type = '[mobileApi] ChangeMobileCarrier';
  constructor(public name: string, public payload: string, public playback, public date: Date) { }
}

export class UpdateMobileNumber {
  static readonly type = '[mobileApi] UpdateMobileNumber';
  constructor(public name: string, public payload: number, public playback, public date: Date) { }
}

export class MobileApiInit {
  static readonly type = '[mobileApi] MobileApiInit';
  constructor(public name: string, public playback, public ngAction: NgAction) { }
}
