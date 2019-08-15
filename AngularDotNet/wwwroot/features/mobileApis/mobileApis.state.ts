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
  action01({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
  }

  @Action(ToggleSpellChecking)
  action02({ patchState }: StateContext<MobileApisStateModel>, { payload }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
  }

  @Action(ClearTextMessage)
  action03({ patchState }: StateContext<MobileApisStateModel>, { payload }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
  }

  @Action(UpdateTextMessage)
  action04({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateTextMessage) {
    patchState({ textMessage: payload });
  }

  @Action(ChangeMobileCarrier)
  action05({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
  }

  @Action(UpdateMobileNumber)
  action06({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
  }
}
