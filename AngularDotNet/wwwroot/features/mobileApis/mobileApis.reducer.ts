import * as fromRoot from "../../src/app/app.state";

export interface State extends fromRoot.State {
  mobileApisState: MobileApisState;
}

export interface MobileApisState {
  spellcheckingEnabled: boolean;
}

const initialState: MobileApisState = {
  spellcheckingEnabled: false
};

export function reducer(state = initialState, action): MobileApisState {

  switch (action.type) {

    case "TOGGLE_SPELLCHECKING":
      console.log("existing state: " + JSON.stringify(state));
      console.log("payload: " + action.payload);
      return {
        ...state,
        spellcheckingEnabled: action.payload
      };

    default:
      return state;
  }
}
