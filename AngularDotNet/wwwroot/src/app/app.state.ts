import { State, Action, StateContext } from '@ngxs/store';
import { tap, map, first, delay } from 'rxjs/operators';

export interface AppStateModel {
  username: string;
  orderId: number;
  status?: 'pending' | 'confirmed' | 'declined';
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    username: '',
    orderId: Math.floor(Math.random() * 23000)
  }
})

export class AppState {
  //constructor(private orderService: OrderService) {
  //}
  //@Action(SetUsername)
  //setUsername({ patchState }: StateContext<AppStateModel>, { payload }: SetUsername) {
  //  patchState({ username: payload });
  //}

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
