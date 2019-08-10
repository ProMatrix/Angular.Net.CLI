import { State, Action, StateContext } from '@ngxs/store';
import { ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber } from './mobileapis.actions';

export class $MobileApisStateModel { // used to detect changes
  spellCheckingEnabled = false;
  clearTextMessage = false;
  textMessage = '';
  mobileCarrier = '';
  mobileNumber = null;
}

export class MobileApisStateModel {
  spellCheckingEnabled = false;
  clearTextMessage = false;
  textMessage = '';
  mobileCarrier = '';
  mobileNumber = null;
  previousState = new $MobileApisStateModel();
}

@State<MobileApisStateModel>({
  name: 'mobileApis',
  defaults: new MobileApisStateModel()
})
export class MobileApisState {

  @Action(ToggleSpellChecking)
  toggleSpellChecking({ patchState }: StateContext<MobileApisStateModel>, { payload }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
  }

  @Action(ClearTextMessage)
  clearMessage({ patchState }: StateContext<MobileApisStateModel>, { payload }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
  }

  @Action(UpdateTextMessage)
  updateMessage({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateTextMessage) {
    patchState({ textMessage: payload });
  }

  @Action(ChangeMobileCarrier)
  changeMobileCarrier({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
  }

  @Action(UpdateMobileNumber)
  updatePhoneNumber({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
  }
}
