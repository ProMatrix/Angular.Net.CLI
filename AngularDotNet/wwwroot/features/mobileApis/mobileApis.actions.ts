
export class ToggleSpellChecking {
  static readonly type = '[mobileApi] ToggleSpellChecking';
  constructor(public payload: boolean) { }
}

export class UpdateTextMessage {
  static readonly type = '[mobileApi] UpdateTextMessage';
  constructor(public payload: string) { }
}

export class ClearTextMessage {
  static readonly type = '[mobileApi] ClearTextMessage';
  constructor(public payload: boolean) { }
}

export class ChangeMobileCarrier {
  static readonly type = '[mobileApi] ChangeMobileCarrier';
  constructor(public payload: string) { }
}

export class UpdateMobileNumber {
  static readonly type = '[mobileApi] UpdateMobileNumber';
  constructor(public payload: number) { }
}
