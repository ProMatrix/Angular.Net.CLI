import { State, Action, StateContext } from '@ngxs/store';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber } from './mobileapis.component.actions';
import { AppComponentState } from '../src/app/app.component.state';

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
export class MobileApisState extends AppComponentState {

  @Action(ChangeTabIndex)
  action01({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
    this.actionQueue.push(new ChangeTabIndex(payload));
  }

  @Action(ToggleSpellChecking)
  action02({ patchState }: StateContext<MobileApisStateModel>, { payload }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
    this.actionQueue.push(new ToggleSpellChecking(payload));
  }

  @Action(ClearTextMessage)
  action03({ patchState }: StateContext<MobileApisStateModel>, { payload }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
    this.actionQueue.push(new ClearTextMessage(payload));
  }

  @Action(UpdateTextMessage)
  action04({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateTextMessage) {
    patchState({ textMessage: payload });
    this.actionQueue.push(new UpdateTextMessage(payload));
  }

  @Action(ChangeMobileCarrier)
  action05({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
    this.actionQueue.push(new ChangeMobileCarrier(payload));
  }

  @Action(UpdateMobileNumber)
  action06({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
    this.actionQueue.push(new UpdateMobileNumber(payload));
  }
}
