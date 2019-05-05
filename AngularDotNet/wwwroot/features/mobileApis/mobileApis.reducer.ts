//import * as fromRoot from "../../src/app/app.state";
//import { MobileApisActions, MobileApisActionTypes } from './mobileApis.actions';

//export interface State extends fromRoot.State {
//  mobileApisState: MobileApisState;
//}

//export interface MobileApisState {
//  spellcheckingEnabled: boolean;
//  textMessage: string;
//  mobileCarrier: string;
//  phoneNumber: string;
//}

//const initialState: MobileApisState = {
//  spellcheckingEnabled: false,
//  textMessage: "",
//  mobileCarrier: "",
//  phoneNumber: "",
//};

//export function reducer(state = initialState, action: MobileApisActions): MobileApisState {
//  switch (action.type) {
//    case MobileApisActionTypes.ToggleSpellChecking:
//      return {
//        ...state,
//        spellcheckingEnabled: action.payload
//      };
//    case MobileApisActionTypes.UpdateMessage:
//      return {
//        ...state,
//        textMessage: action.payload
//      };
//    case MobileApisActionTypes.ClearMessage:
//      return {
//        ...state,
//        textMessage: ""
//      };
//    case MobileApisActionTypes.ChangeMobileCarrier:
//      return {
//        ...state,
//        mobileCarrier: action.payload
//      };
//    case MobileApisActionTypes.UpdatePhoneNumber:
//      return {
//        ...state,
//        phoneNumber: action.payload
//      };

//    default:
//      return state;
//  }
//}
