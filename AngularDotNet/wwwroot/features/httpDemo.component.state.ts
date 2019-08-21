import { State, Action, StateContext } from '@ngxs/store';
import { HttpDownload } from './httpDemo.component.actions';

export class $HttpDemoStateModel { // used to detect changes
  httpDownloaded = new Object();
}

export class HttpDemoStateModel {
  httpDownloaded = new Object();
  previousState = new $HttpDemoStateModel();
}

@State<HttpDemoStateModel>({
  name: 'httpDemo',
  defaults: new HttpDemoStateModel()
})

export class HttpDemoState {

  @Action(HttpDownload)
  action01({ patchState }: StateContext<HttpDemoStateModel>, { payload }: HttpDownload) {
    patchState({ httpDownloaded: payload });
  }

}
