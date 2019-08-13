import { State, Action, StateContext } from '@ngxs/store';
import { RequestAppSettings, ResponseAppSettings, NavigateTo, ServiceSuccess, ServiceError } from './side-nav.actions';

export class $SideNavStateModel { // used to detect changes
  requestAppSettings: boolean;
  responseAppSettings: boolean;
  serviceName: string;
  featureName: string;
}

export class SideNavStateModel {
  requestAppSettings: boolean;
  responseAppSettings: boolean;
  serviceName: string;
  featureName: string;
  previousState = new $SideNavStateModel();
}

@State<SideNavStateModel>({
  name: 'sideNav',
  defaults: new SideNavStateModel()
})

export class SideNavState {

  @Action(RequestAppSettings)
  getAppSettings({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestAppSettings) {
    patchState({ requestAppSettings: payload });
  }

  @Action(ResponseAppSettings)
  fillAppSettings({ patchState }: StateContext<SideNavStateModel>, { payload }: ResponseAppSettings) {
    patchState({ responseAppSettings: payload });
  }

  @Action(NavigateTo)
  navigateTo({ patchState }: StateContext<SideNavStateModel>, { payload }: NavigateTo) {
    patchState({ featureName: payload });
  }

  @Action(ServiceSuccess)
  serviceSuccess({ patchState }: StateContext<SideNavStateModel>, { payload }: ServiceSuccess) {
    patchState({ serviceName: payload });
  }

  @Action(ServiceError)
  serviceError({ patchState }: StateContext<SideNavStateModel>, { payload }: ServiceError) {
    patchState({ serviceName: payload });
  }

}
