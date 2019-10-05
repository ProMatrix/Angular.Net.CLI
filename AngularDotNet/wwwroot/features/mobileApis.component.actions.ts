
export class ChangeTabIndex {
  static readonly type = '[mobileApi] ChangeTabIndex';
  constructor(public actionName: string, public name: string, public payload: number, public playback, public delay: number) { }
}

export class ToggleSpellChecking {
  static readonly type = '[mobileApi] ToggleSpellChecking';
  constructor(public actionName: string, public name: string, public payload: boolean, public playback, public delay: number) { }
}

export class UpdateTextMessage {
  static readonly type = '[mobileApi] UpdateTextMessage';
  constructor(public actionName: string, public name: string, public payload: string, public playback, public delay: number) { }
}

export class ClearTextMessage {
  static readonly type = '[mobileApi] ClearTextMessage';
  constructor(public actionName: string, public name: string, public payload: boolean, public playback, public delay: number) { }
}

export class ChangeMobileCarrier {
  static readonly type = '[mobileApi] ChangeMobileCarrier';
  constructor(public actionName: string, public name: string, public payload: string, public playback, public delay: number) { }
}

export class UpdateMobileNumber {
  static readonly type = '[mobileApi] UpdateMobileNumber';
  constructor(public actionName: string, public name: string, public payload: number, public playback, public delay: number) { }
}

export class MobileApiInit {
  static readonly type = '[mobileApi] MobileApiInit';
  constructor(public ngAction: any) { }
}
