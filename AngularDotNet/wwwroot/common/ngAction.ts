import { Store } from '@ngxs/store';

export class NgAction {

  constructor(private store: Store) { }
  date = new Date();
  dispatching = false;
  queue = new Array<any>();

  realtimeDispatch() {
    this.store.dispatch({ type: '@@INIT' });
    this.store.dispatch({ type: '@@UPDATE_STATE' });

    const actionQueue = Array.from(this.queue);
    this.queue.length = 0;
    this.dispatching = true;

    actionQueue.forEach((action) => {
      let timing = 0;

      let ms = 0;
      if (action.date) {
        ms = action.date.getTime() - this.date.getTime();
      }
      timing = timing + ms;
      if (action.playback) {
        setTimeout(() => {
          this.store.dispatch(action);
        }, timing);
      }
    });
  }


}
