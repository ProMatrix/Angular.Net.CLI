import { State, Action, StateContext } from '@ngxs/store';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber } from './mobileapis.actions';

export class $MobileApisStateModel { // used to detect changes
  selectedIndex = 0;
  spellCheckingEnabled = false;
  clearTextMessage = false;
  textMessage = '';
  mobileCarrier = '';
  mobileNumber = null;
}

export class MobileApisStateModel {
  selectedIndex = 0;
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

  @Action(ChangeTabIndex)
  changeIndex({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
  }

  @Action(ToggleSpellChecking)
  toggleChecking({ patchState }: StateContext<MobileApisStateModel>, { payload }: ToggleSpellChecking) {
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
  changeCarrier({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
  }

  @Action(UpdateMobileNumber)
  updateNumber({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
  }
}
