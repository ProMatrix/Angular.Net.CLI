
export class ToggleSpellChecking {
  static readonly type = '[mobileApi] Toggle Spell Checking';
  constructor(public payload: string) { }
}

export class UpdateMessage {
  static readonly type = '[mobileApi] Update Message';
  constructor(public payload: string) { }
}

export class ClearMessage {
  static readonly type = '[mobileApi] Clear Message';
}

export class ChangeMobileCarrier {
  static readonly type = '[mobileApi] Change Mobile Carrier';
  constructor(public payload: string) { }
}

export class UpdatePhoneNumber {
  static readonly type = '[mobileApi] Toggle SpellChecking';
  constructor(public payload: number) { }
}
