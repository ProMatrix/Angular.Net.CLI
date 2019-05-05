import { State, Action, StateContext } from '@ngxs/store';
import { tap, map, first, delay } from 'rxjs/operators';
import { GetAppConfig } from './app.actions';

export interface AppStateModel {
  launchTime: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    launchTime: ""
  }
})

export class AppState {
  //constructor(private orderService: OrderService) {
  //}
  @Action(GetAppConfig)
  getAppConfig({ patchState }: StateContext<AppStateModel>, { payload }: GetAppConfig) {
    patchState({ launchTime: payload });
  }

  //// Note: there are problems with this action/state
  //// this works using ng serve but not kestrel
  //@Action(ConfirmOrder)
  //confirm({ dispatch, patchState }: StateContext<AppStateModel>) {
  //  patchState({ status: 'pending' });
  //  return this.orderService.post().pipe(
  //    tap(success => (success ? dispatch(OrderSuccess) : dispatch(OrderFailed)))
  //  );
  //}

  //@Action(OrderSuccess)
  //orderSuccess({ patchState }: StateContext<AppStateModel>) {
  //  patchState({ status: 'confirmed' });
  //}

  //@Action(OrderFailed)
  //orderFailed({ patchState }: StateContext<AppStateModel>) {
  //  patchState({ status: 'declined' });
  //}
}
