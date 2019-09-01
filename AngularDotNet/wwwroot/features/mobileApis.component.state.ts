import { State, Action, StateContext } from '@ngxs/store';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage, ChangeMobileCarrier, UpdateMobileNumber } from './mobileapis.component.actions';
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
  constructor(private readonly ac: AppConfig) {

  }

  @Action(ChangeTabIndex)
  action01({ patchState }: StateContext<MobileApisStateModel>, { payload, playback }: ChangeTabIndex) {
    patchState({ selectedIndex: payload });
    this.ac.actionQueue.push(new ChangeTabIndex(payload, playback));
  }

  @Action(ToggleSpellChecking)
  action02({ patchState }: StateContext<MobileApisStateModel>, { payload, playback }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
    this.ac.actionQueue.push(new ToggleSpellChecking(payload, playback));
  }

  @Action(ClearTextMessage)
  action03({ patchState }: StateContext<MobileApisStateModel>, { payload, playback }: ClearTextMessage) {
    patchState({ clearTextMessage: payload });
    this.ac.actionQueue.push(new ClearTextMessage(payload, playback));
  }

  @Action(UpdateTextMessage)
  action04({ patchState }: StateContext<MobileApisStateModel>, { payload, playback }: UpdateTextMessage) {
    patchState({ textMessage: payload });
    this.ac.actionQueue.push(new UpdateTextMessage(payload, playback));
  }

  @Action(ChangeMobileCarrier)
  action05({ patchState }: StateContext<MobileApisStateModel>, { payload, playback }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
    this.ac.actionQueue.push(new ChangeMobileCarrier(payload, playback));
  }

  @Action(UpdateMobileNumber)
  action06({ patchState }: StateContext<MobileApisStateModel>, { payload, playback }: UpdateMobileNumber) {
    patchState({ mobileNumber: payload });
    this.ac.actionQueue.push(new UpdateMobileNumber(payload, playback));
  }
}
