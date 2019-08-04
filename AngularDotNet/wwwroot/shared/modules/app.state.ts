import { State, Action, StateContext } from '@ngxs/store';
import { NavigateTo, GetAppSettings, ServiceSuccess, ServiceError } from './app.actions';

export interface AppStateModel {
  launchTime: string;
  serviceName: string;
  featureName: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    launchTime: '',
    serviceName: '',
    featureName: ''
  }
})

export class AppState {
  @Action(NavigateTo)
  navigateTo({ patchState }: StateContext<AppStateModel>, { payload }: NavigateTo) {
    patchState({ featureName: payload });
  }

  @Action(GetAppSettings)
  getAppSettings({ patchState }: StateContext<AppStateModel>, { payload }: GetAppSettings) {
    patchState({ launchTime: payload });
  }

  @Action(ServiceSuccess)
  serviceSuccess({ patchState }: StateContext<AppStateModel>, { payload }: ServiceSuccess) {
    patchState({ serviceName: payload });
  }

  @Action(ServiceError)
  serviceError({ patchState }: StateContext<AppStateModel>, { payload }: ServiceError) {
    patchState({ serviceName: payload });
  }

}
