import * as fromRoot from "../../src/app/app.state";
import { MobileApisActions, MobileApisActionTypes } from './mobileApis.actions';

export interface State extends fromRoot.State {
  mobileApisState: MobileApisState;
}

export interface MobileApisState {
  spellcheckingEnabled: boolean;
}

const initialState: MobileApisState = {
  spellcheckingEnabled: false
};

export function reducer(state = initialState, action: MobileApisActions): MobileApisState {
  switch (action.type) {
    case MobileApisActionTypes.ToggleSpellChecking:
      return {
        ...state,
        spellcheckingEnabled: action.payload
      };

    default:
      return state;
  }
}
