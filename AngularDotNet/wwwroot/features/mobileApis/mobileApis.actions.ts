import { Action } from "@ngrx/store";

export enum MobileApisActionTypes {
  ToggleSpellChecking = "[MobileApis] Toggle Spell Checking"
}

export class ToggleSpellChecking implements Action {
  readonly type = MobileApisActionTypes.ToggleSpellChecking;

  constructor(public payload: boolean) { }
}

export type MobileApisActions = ToggleSpellChecking;
