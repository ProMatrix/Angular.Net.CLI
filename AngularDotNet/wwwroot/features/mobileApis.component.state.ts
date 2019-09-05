import { State, Action, StateContext } from '@ngxs/store';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber, MobileApiInit } from './mobileapis.component.actions';
import { AppComponentState } from '../src/app/app.component.state';
import { NgAction } from '../common/ngAction';

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
  action01({ patchState }: StateContext<MobileApisStateModel>, { name, payload, playback, date }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
    this.ngAction.appendToQueue(new ChangeTabIndex(name, payload, playback, date));
  }

  @Action(ToggleSpellChecking)
  action02({ patchState }: StateContext<MobileApisStateModel>, { name, payload, playback, date }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
    this.ngAction.appendToQueue(new ToggleSpellChecking(name, payload, playback, date));
  }

  @Action(ClearTextMessage)
  action03({ patchState }: StateContext<MobileApisStateModel>, { name, payload, playback, date }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
    this.ngAction.appendToQueue(new ClearTextMessage(name, payload, playback, date));
  }

  @Action(UpdateTextMessage)
  action04({ patchState }: StateContext<MobileApisStateModel>, { name, payload, playback, date }: UpdateTextMessage) {
    patchState({ textMessage: payload });
    this.ngAction.appendToQueue(new UpdateTextMessage(name, payload, playback, date));
  }

  @Action(ChangeMobileCarrier)
  action05({ patchState }: StateContext<MobileApisStateModel>, { name, payload, playback, date }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
    this.ngAction.appendToQueue(new ChangeMobileCarrier(name, payload, playback, date));
  }

  @Action(UpdateMobileNumber)
  action06({ patchState }: StateContext<MobileApisStateModel>, { name, payload, playback, date }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
    this.ngAction.appendToQueue(new UpdateMobileNumber(name, payload, playback, date));
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
