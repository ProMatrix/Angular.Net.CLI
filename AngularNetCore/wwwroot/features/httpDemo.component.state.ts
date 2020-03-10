import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { RequestHttpDownload, ResponseHttpDownload } from './httpDemo.component.actions';
import { EntityService } from '../common/entityService';

export class HttpDemoStateModel {
  requestHttpDownload = false;
  blob: Blob;
}

@State<HttpDemoStateModel>({
  name: 'httpDemo',
  defaults: new HttpDemoStateModel()
})
@Injectable()
export class HttpDemoState {

  constructor(
    private readonly es: EntityService) {
  }

  @Action(RequestHttpDownload)
  action01({ patchState }: StateContext<HttpDemoStateModel>, { payload }: RequestHttpDownload) {
    patchState({ requestHttpDownload: payload });
  }

  @Action(ResponseHttpDownload)
  action02({ patchState }: StateContext<HttpDemoStateModel>, { payload, samplePayload }: ResponseHttpDownload) {

    if (samplePayload) {
      this.es.samplePayload(payload, 'text/plain', (successMessage) => {
        patchState({ blob: payload });
      }, (errorMessage: string) => {
        alert(errorMessage);
      });
    } else {
      patchState({ blob: payload });
    }
  }

}
