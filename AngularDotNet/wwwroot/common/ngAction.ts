import { Store } from '@ngxs/store';

export class NgAction {

  constructor(private store: Store) { }

  private dispatchQueue = new Array<any>(); // fills as new actions are dispatched
  private playbackQueue = this.dispatchQueue; // used by this class
  private date = new Date();
  private recording = false;

  actionQueue = this.dispatchQueue; // used by the ui for listing all actions

  dispatching = false;

  startRecording() {
    this.recording = true;
    this.date = new Date();
  }

  stopRecording() {
    this.recording = false;
  }

  isRecording(): boolean {
    return this.recording;
  }

  clearRecording() {

  }

  appendToQueue(action: any) {
    if (this.recording) {
      this.dispatchQueue.push(action);
    }
  }

  getLatestIndex(): number {
    return this.dispatchQueue.length - 1;
  }

  realtimeDispatch() {
    this.store.dispatch({ type: '@@INIT' });
    this.store.dispatch({ type: '@@UPDATE_STATE' });

    this.playbackQueue = Array.from(this.dispatchQueue);
    this.actionQueue = this.playbackQueue;
    this.dispatchQueue.length = 0;
    this.dispatching = true;

    this.playbackQueue.forEach((action) => {
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
