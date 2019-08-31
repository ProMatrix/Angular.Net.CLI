
import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, RequestStateInit } from './side-nav.component.actions';
import { AppSettings } from '../../shared/client-side-models/buildModels';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { AppComponentState } from './app.component.state';

export class $SideNavStateModel { // used to detect changes
  requestAppSettings = false;
  responseAppSettings = new AppSettings();
  featureName = "";
}

export class SideNavStateModel {
  requestAppSettings = false;
  responseAppSettings = new AppSettings();
  featureName = "";
  previousState = new $SideNavStateModel();
  actionQueue: Array<object>;
}

@State<SideNavStateModel>({
  name: 'sideNav',
  defaults: new SideNavStateModel()
})

export class SideNavState extends AppComponentState {

  @Action(RequestAppSettings)
  action01({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestAppSettings) {
    patchState({ requestAppSettings: payload });
    this.actionQueue.push(new RequestAppSettings(payload));
  }

  @Action(ResponseAppSettings)
  action02({ patchState }: StateContext<SideNavStateModel>, { payload }: ResponseAppSettings) {
    patchState({ responseAppSettings: payload });
    this.actionQueue.push(new ResponseAppSettings(payload));
  }

  @Action(NavigateTo)
  action03({ patchState }: StateContext<SideNavStateModel>, { payload }: NavigateTo) {
    patchState({ featureName: payload });
    this.actionQueue.push(new NavigateTo(payload));
  }

  @Action(RequestStateInit)
  action04({ patchState }: StateContext<SideNavStateModel>, { }: RequestStateInit) {
    patchState({ actionQueue: this.actionQueue });
  }

}
