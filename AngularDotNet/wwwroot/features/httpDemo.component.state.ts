import { State, Action, StateContext } from '@ngxs/store';
import { RequestHttpDownload, ResponseHttpDownload } from './httpDemo.component.actions';

export class $HttpDemoStateModel { // used to detect changes
  requestHttpDownload = false;
  httpDownloaded = new Object();
}

export class HttpDemoStateModel {
  requestHttpDownload = false;
  httpDownloaded = new Object();
  previousState = new $HttpDemoStateModel();
}

@State<HttpDemoStateModel>({
  name: 'httpDemo',
  defaults: new HttpDemoStateModel()
})

export class HttpDemoState {

  @Action(RequestHttpDownload)
  action01({ patchState }: StateContext<HttpDemoStateModel>, { payload }: RequestHttpDownload) {
    patchState({ requestHttpDownload: payload });
  }

  @Action(ResponseHttpDownload)
  action02({ patchState }: StateContext<HttpDemoStateModel>, { payload }: RequestHttpDownload) {
    patchState({ httpDownloaded: payload });
  }

}
