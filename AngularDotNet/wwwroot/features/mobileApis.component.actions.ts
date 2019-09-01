
export class ChangeTabIndex {
  static readonly type = '[mobileApi] ChangeTabIndex';
  constructor(public payload: number, public playback) { }
}

export class ToggleSpellChecking {
  static readonly type = '[mobileApi] ToggleSpellChecking';
  constructor(public payload: boolean, public playback) { }
}

export class UpdateTextMessage {
  static readonly type = '[mobileApi] UpdateTextMessage';
  constructor(public payload: string, public playback) { }
}

export class ClearTextMessage {
  static readonly type = '[mobileApi] ClearTextMessage';
  constructor(public payload: boolean, public playback) { }
}

export class ChangeMobileCarrier {
  static readonly type = '[mobileApi] ChangeMobileCarrier';
  constructor(public payload: string, public playback) { }
}

export class UpdateMobileNumber {
  static readonly type = '[mobileApi] UpdateMobileNumber';
  constructor(public payload: number, public playback) { }
}

export class MobileApiInit {
  static readonly type = '[mobileApi] MobileApiInit';
  constructor(public actionQueue: Array <any>) { }
}
