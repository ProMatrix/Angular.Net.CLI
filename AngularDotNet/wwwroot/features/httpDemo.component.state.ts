import { State, Action, StateContext } from '@ngxs/store';
import { RequestHttpDownload } from './httpDemo.component.actions';

export class HttpDemoStateModel {
  requestHttpDownload = false;
  httpDownloaded = new Object();
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

  //@Action(ResponseHttpDownload)
  //action02({ patchState }: StateContext<HttpDemoStateModel>, { payload }: ResponseHttpDownload) {
  //  patchState({ httpDownloaded: payload });
  //}

}
