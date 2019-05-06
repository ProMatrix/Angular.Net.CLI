import { Action } from "@ngrx/store";

export enum MobileApisActionTypes {
  ToggleSpellChecking = "[MobileApis] Toggle Spell Checking",
  UpdateMessage = "[MobileApis]  Update Message",
  ClearMessage = "[MobileApis]  Clear Message",
  ChangeMobileCarrier = "[MobileApis]  Change Carrier",
  UpdatePhoneNumber = "[MobileApis]  Phone Number",
}

export class ToggleSpellChecking implements Action {
  readonly type = MobileApisActionTypes.ToggleSpellChecking;
  constructor(public payload: boolean) { }
}

export class UpdateMessage implements Action {
  readonly type = MobileApisActionTypes.UpdateMessage;
  constructor(public payload: string) { }
}

export class ClearMessage implements Action {
  readonly type = MobileApisActionTypes.ClearMessage;
}

export class ChangeMobileCarrier implements Action {
  readonly type = MobileApisActionTypes.ChangeMobileCarrier;
  constructor(public payload: string) { }
}

export class UpdatePhoneNumber implements Action {
  readonly type = MobileApisActionTypes.UpdatePhoneNumber;
  constructor(public payload: string) { }
}

export type MobileApisActions = ToggleSpellChecking | UpdateMessage | ClearMessage | ChangeMobileCarrier | UpdatePhoneNumber;
