import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, SideNavInit } from './side-nav.component.actions';
import { AppSettings } from 'ngx-modeling';
import { AppServices } from 'ng2-models';
import { AppComponentState } from './app.component.state';
import { NgAction } from '../../common/ngAction';

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
  action01({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestAppSettings) {
    patchState({ requestAppSettings: payload });
    // Don't record this state change
  }

  @Action(ResponseAppSettings)
  action02({ patchState }: StateContext<SideNavStateModel>, { payload }: ResponseAppSettings) {
    patchState({ responseAppSettings: payload });
    // Don't record this state change
  }

  @Action(NavigateTo)
  action03({ patchState }: StateContext<SideNavStateModel>, { name, title, payload, playback, delay }: NavigateTo) {
    patchState({ featureName: payload });
    this.ngAction.appendToQueue(new NavigateTo(name, title, payload, playback, delay));
  }

  @Action(SideNavInit)
  action04({ }: StateContext<SideNavStateModel>, { ngAction }: SideNavInit) {
    this.ngAction = ngAction;
  }
}
