import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit } from './side-nav.component.actions';
import { AppSettings } from '../../shared/client-side-models/buildModels';
import { AppServices } from '../../shared/ng2-apphelper/appServices';
import { AppComponentState } from './app.component.state';
import { NgAction, ActionJackson } from '../../common/ngAction';

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
}

@State<SideNavStateModel>({
  name: 'sideNav',
  defaults: new SideNavStateModel()
})

export class SideNavState {
  ngAction: NgAction;

  @Action(RequestAppSettings)
  action01({ patchState }: StateContext<SideNavStateModel>, { name, payload }: RequestAppSettings) {
    patchState({ requestAppSettings: payload });
    // Don't record this state change
  }

  @Action(ResponseAppSettings)
  action02({ patchState }: StateContext<SideNavStateModel>, { name, payload }: ResponseAppSettings) {
    patchState({ responseAppSettings: payload });
    // Don't record this state change
  }

  @Action(NavigateTo)
  action03({ patchState }: StateContext<SideNavStateModel>, { name, payload, playback, delay, action, actionJackson }: NavigateTo) {
    patchState({ featureName: payload });
    this.ngAction.appendToQueue(new NavigateTo(name, payload, playback, delay, action, actionJackson));
  }

  @Action(SideNavInit)
  action04({ patchState, getState }: StateContext<SideNavStateModel>, { ngAction }: SideNavInit) {
    this.ngAction = ngAction;
  }
}
