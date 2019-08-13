import { State, Action, StateContext } from '@ngxs/store';
import { NavigateTo, RequestAppSettings, ServiceSuccess, ServiceError } from './side-nav.actions';

export class $SideNavStateModel { // used to detect changes
  launchTime: string;
  serviceName: string;
  featureName: string;
}

export class SideNavStateModel {
  launchTime: string;
  serviceName: string;
  featureName: string;
  previousState = new $SideNavStateModel();
}

@State<SideNavStateModel>({
  name: 'sideNav',
  defaults: new SideNavStateModel()
})

export class SideNavState {
  @Action(NavigateTo)
  navigateTo({ patchState }: StateContext<SideNavStateModel>, { payload }: NavigateTo) {
    patchState({ featureName: payload });
  }

  @Action(RequestAppSettings)
  getAppSettings({ patchState }: StateContext<SideNavStateModel>, { payload }: RequestAppSettings) {
    patchState({ launchTime: payload });
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
