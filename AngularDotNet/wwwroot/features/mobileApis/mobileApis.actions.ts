
export class ToggleSpellChecking {
  static readonly type = '[mobileApi] ToggleSpellChecking';
  constructor(public payload: boolean) { }
}

export class UpdateMessage {
  static readonly type = '[mobileApi] UpdateMessage';
  constructor(public payload: string) { }
}

export class ClearMessage {
  static readonly type = '[mobileApi] ClearMessage';
}

export class ChangeMobileCarrier {
  static readonly type = '[mobileApi] ChangeMobileCarrier';
  constructor(public payload: string) { }
}

export class UpdateMobileNumber {
  static readonly type = '[mobileApi] UpdateMobileNumber';
  constructor(public payload: number) { }
}
