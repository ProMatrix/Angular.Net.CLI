import { Store } from '@ngxs/store';

export class NgAction {

  constructor(private store: Store) { }

  private dispatchQueue = new Array<any>(); // fills as new actions are dispatched
  private playbackQueue = this.dispatchQueue; // used by this class
  private date = new Date();
  private recording = false;
  private dispatching = false;

  actionQueue = this.dispatchQueue; // used by the ui for listing all actions


  startRecording() {
    this.recording = true;
  }

  stopRecording() {
    this.recording = false;
  }

  isRecording(): boolean {
    return this.recording;
  }

  isDispatching(): boolean {
    return this.dispatching;
  }

  appendToQueue(action: any) {
    if (this.recording) {
      this.dispatchQueue.push(action);
    }
  }

  clearQueue() {
    this.date = new Date();
    this.dispatchQueue.length = 0;
    this.playbackQueue.length = 0;
    this.actionQueue.length = 0;
  }

  getLatestIndex(): number {
    return this.dispatchQueue.length - 1;
  }

  singleDispatch(action: any) {
    this.store.dispatch(action);
  }

  realtimeDispatch() {
    this.store.dispatch({ type: '@@INIT' });
    this.store.dispatch({ type: '@@UPDATE_STATE' });

    this.playbackQueue = Array.from(this.dispatchQueue);
    this.actionQueue = this.playbackQueue;
    this.dispatchQueue.length = 0;
    this.dispatching = true;
    this.recording = true;

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
          if (this.dispatchQueue.length === this.playbackQueue.length) {
            this.dispatching = false;
            this.actionQueue = this.dispatchQueue;
          }
        }, timing);
      }
    });
  }


}
