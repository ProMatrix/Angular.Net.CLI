import { Action } from "@ngrx/store";

export enum MobileApisActionTypes {
  ToggleSpellChecking = "[MobileApis] Toggle Spell Checking",
  UpdateMessage = "[MobileApis]  Update Message",
}

export class ToggleSpellChecking implements Action {
  readonly type = MobileApisActionTypes.ToggleSpellChecking;

  constructor(public payload: boolean) { }
}

export class UpdateMessage implements Action {
  readonly type = MobileApisActionTypes.UpdateMessage;

  constructor(public payload: string) { }
}

export type MobileApisActions = ToggleSpellChecking | UpdateMessage;
