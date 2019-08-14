import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo } from './side-nav.actions';
import { AppSettings } from '../../shared/client-side-models/buildModels';
import { AppServices } from '../../shared/ng2-apphelper/appServices';

export class $SideNavStateModel { // used to detect changes
  requestAppSettings: boolean;
  responseAppSettings = new AppSettings();
  featureName = "";
}

export class SideNavStateModel {
  requestAppSettings: boolean;
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

}
