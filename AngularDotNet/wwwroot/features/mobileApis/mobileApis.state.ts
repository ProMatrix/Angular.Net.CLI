import { State, Action, StateContext } from '@ngxs/store';
import { ToggleSpellChecking, UpdateMessage, ClearMessage, ChangeMobileCarrier, UpdatePhoneNumber } from "./mobileapis.actions";

export interface MobileApisStateModel {
  spellCheckingEnabled: boolean;
  textMessage: string;
  mobileCarrier: string;
  mobileNumber?: number;
}

@State<MobileApisStateModel>({
  name: 'mobileApis',
  defaults: {
    spellCheckingEnabled: false,
    textMessage: "",
    mobileCarrier: "",
  }
})
export class MobileApisState {

  @Action(ToggleSpellChecking)
  toggleSpellChecking({ patchState }: StateContext<MobileApisStateModel>, { payload }: ToggleSpellChecking) {
    patchState({ spellCheckingEnabled: payload });
  }

  @Action(UpdateMessage)
  updateMessage({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdateMessage) {
    patchState({ textMessage: payload });
  }

  @Action(ClearMessage)
  clearMessage({ patchState }: StateContext<MobileApisStateModel>) {
  }

  @Action(ChangeMobileCarrier)
  changeMobileCarrier({ patchState }: StateContext<MobileApisStateModel>, { payload }: ChangeMobileCarrier) {
    patchState({ mobileCarrier: payload });
  }

  @Action(UpdatePhoneNumber)
  updatePhoneNumber({ patchState }: StateContext<MobileApisStateModel>, { payload }: UpdatePhoneNumber) {
    patchState({ mobileNumber: payload });
  }
}
