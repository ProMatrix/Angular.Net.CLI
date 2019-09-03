import { State, Action, StateContext } from '@ngxs/store';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber, MobileApiInit } from './mobileapis.component.actions';
import { AppComponentState } from '../src/app/app.component.state';
import { AppConfig } from '../common/appconfig';

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
  actionQueue: Array<any>;

  @Action(ChangeTabIndex)
  action01({ patchState }: StateContext<MobileApisStateModel>, { payload, playback, date }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
    this.actionQueue.push(new ChangeTabIndex(payload, playback, date));
  }

  @Action(ToggleSpellChecking)
  action02({ patchState }: StateContext<MobileApisStateModel>, { payload, playback, date }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
    this.actionQueue.push(new ToggleSpellChecking(payload, playback, date));
  }

  @Action(ClearTextMessage)
  action03({ patchState }: StateContext<MobileApisStateModel>, { payload, playback, date }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
    this.actionQueue.push(new ClearTextMessage(payload, playback, date));
  }

  @Action(UpdateTextMessage)
  action04({ patchState }: StateContext<MobileApisStateModel>, { payload, playback, date }: UpdateTextMessage) {
    patchState({ textMessage: payload });
    this.actionQueue.push(new UpdateTextMessage(payload, playback, date));
  }

  @Action(ChangeMobileCarrier)
  action05({ patchState }: StateContext<MobileApisStateModel>, { payload, playback, date }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
    this.actionQueue.push(new ChangeMobileCarrier(payload, playback, date));
  }

  @Action(UpdateMobileNumber)
  action06({ patchState }: StateContext<MobileApisStateModel>, { payload, playback, date }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
    this.actionQueue.push(new UpdateMobileNumber(payload, playback, date));
  }

  @Action(MobileApiInit)
  action07({ patchState, getState, setState }: StateContext<MobileApisStateModel>, { actionQueue }: MobileApiInit) {
    patchState({ selectedIndex: 0 });
    this.actionQueue = actionQueue;
  }
}
