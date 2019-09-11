import { State, Action, StateContext } from '@ngxs/store';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber, MobileApiInit } from './mobileapis.component.actions';
import { AppComponentState } from '../src/app/app.component.state';
import { NgAction } from '../shared/enterprise/ngAction';

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
  ngAction: NgAction;

  @Action(ChangeTabIndex)
  action01({ patchState }: StateContext<MobileApisStateModel>, { action, name, payload, playback, delay }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
    this.ngAction.appendToQueue(new ChangeTabIndex(action, name, payload, playback, delay));
  }

  @Action(ToggleSpellChecking)
  action02({ patchState }: StateContext<MobileApisStateModel>, { action, name, payload, playback, delay }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
    this.ngAction.appendToQueue(new ToggleSpellChecking(action, name, payload, playback, delay));
  }

  @Action(ClearTextMessage)
  action03({ patchState }: StateContext<MobileApisStateModel>, { action, name, payload, playback, delay }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
    this.ngAction.appendToQueue(new ClearTextMessage(action, name, payload, playback, delay));
  }

  @Action(UpdateTextMessage)
  action04({ patchState }: StateContext<MobileApisStateModel>, { action, name, payload, playback, delay }: UpdateTextMessage) {
    patchState({ textMessage: payload });
    this.ngAction.appendToQueue(new UpdateTextMessage(action, name, payload, playback, delay));
  }

  @Action(ChangeMobileCarrier)
  action05({ patchState }: StateContext<MobileApisStateModel>, { action, name, payload, playback, delay }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
    this.ngAction.appendToQueue(new ChangeMobileCarrier(action, name, payload, playback, delay));
  }

  @Action(UpdateMobileNumber)
  action06({ patchState }: StateContext<MobileApisStateModel>, { action, name, payload, playback, delay }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
    this.ngAction.appendToQueue(new UpdateMobileNumber(action, name, payload, playback, delay));
  }

  @Action(MobileApiInit)
  action07({ patchState, getState, setState }: StateContext<MobileApisStateModel>, { ngAction }: MobileApiInit) {
    patchState({ selectedIndex: 0 });
    patchState({ spellCheckingEnabled: false });
    patchState({ clearTextMessage: false });
    patchState({ textMessage: '' });
    patchState({ mobileCarrier: '' });
    patchState({ mobileNumber: null });
    patchState({ previousState: new $MobileApisStateModel() });
    this.ngAction = ngAction;
  }
}
