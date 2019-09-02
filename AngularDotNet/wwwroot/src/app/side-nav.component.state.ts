import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit } from './side-nav.component.actions';
import { AppSettings } from '../../shared/client-side-models/buildModels';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { AppComponentState } from './app.component.state';
import { AppConfig } from '../../common/appconfig';

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
  actionQueue: Array<any>;
}

@State<SideNavStateModel>({
  name: 'sideNav',
  defaults: new SideNavStateModel()
})

export class SideNavState {
  actionQueue: Array<any>;

  @Action(RequestAppSettings)
  action01({ patchState }: StateContext<SideNavStateModel>, { payload, playback }: RequestAppSettings) {
    patchState({ requestAppSettings: payload });
    this.actionQueue.push(new RequestAppSettings(payload, playback));
  }

  @Action(ResponseAppSettings)
  action02({ patchState }: StateContext<SideNavStateModel>, { payload, playback }: ResponseAppSettings) {
    patchState({ responseAppSettings: payload });
    this.actionQueue.push(new ResponseAppSettings(payload, playback));
  }

  @Action(NavigateTo)
  action03({ patchState }: StateContext<SideNavStateModel>, { payload, playback }: NavigateTo) {
    patchState({ featureName: payload });
    this.actionQueue.push(new NavigateTo(payload, playback));
  }

  @Action(SideNavInit)
  action04({ patchState, getState }: StateContext<SideNavStateModel>, { actionQueue }: SideNavInit) {
    let z = getState();
    this.actionQueue = actionQueue;
  }

}
