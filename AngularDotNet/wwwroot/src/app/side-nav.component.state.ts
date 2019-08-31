import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, RequestStateInit, RequestStateReset } from './side-nav.component.actions';
import { AppSettings } from '../../shared/client-side-models/buildModels';
import { AppServices } from '../../shared/ng2-apphelper/appServices';

export class $SideNavStateModel { // used to detect changes
  requestAppSettings = false;
  responseAppSettings = new AppSettings();
  featureName = "";
}

export class SideNavStateModel {
  requestStateInit = false;
  requestStateReset = false;
  requestAppSettings = false;
  responseAppSettings = new AppSettings();
  featureName = "";
  previousState = new $SideNavStateModel();
}

@State<SideNavStateModel>({
  name: 'sideNav',
  defaults: new SideNavStateModel()
})

export class SideNavState {

  @Action(RequestAppSettings)
  action01({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestAppSettings) {
    patchState({ requestAppSettings: payload });
  }

  @Action(ResponseAppSettings)
  action02({ patchState }: StateContext<SideNavStateModel>, { payload }: ResponseAppSettings) {
    patchState({ responseAppSettings: payload });
  }

  @Action(NavigateTo)
  action03({ patchState }: StateContext<SideNavStateModel>, { payload }: NavigateTo) {
    patchState({ featureName: payload });
  }

  @Action(RequestStateInit)
  action04({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestStateInit) {
    patchState({ requestStateInit: payload });
  }

  @Action(RequestStateReset)
  action05({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestStateReset) {
    patchState({ requestStateReset: payload });
  }

}
