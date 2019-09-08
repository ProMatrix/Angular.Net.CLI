import { Store } from '@ngxs/store';

export class NgAction {

  constructor(private store: Store) { }

  actionQueue = new Array<any>(); // fills as new actions are dispatched
  private playbackQueue = this.actionQueue; // used by this class
  private currentIndex = -1;
  private recording = false;
  private dispatching = false;
  private lastTicks = 0;

  startRecording() {
    this.recording = true;
    this.lastTicks = 0;
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
      const currentTicks = new Date().getTime();
      if (this.lastTicks === 0) {
        action.delay = 1000;
      } else {
        action.delay = currentTicks - this.lastTicks;
      }
      this.lastTicks = currentTicks;

      this.actionQueue.push(action);
      this.currentIndex = this.actionQueue.length - 1;
    }
  }

  clearQueue() {
    this.playbackQueue.length = 0;
    this.actionQueue.length = 0;
    this.currentIndex = -1;
  }

  getLatestIndex(): number {
    return this.currentIndex;
  }

  singleAction(index: number) {
    this.recording = false;
    this.dispatching = false;
    this.store.dispatch(this.actionQueue[index]);
    this.currentIndex = index;
  }

  playback() {
    this.store.dispatch({ type: '@@INIT' });
    this.store.dispatch({ type: '@@UPDATE_STATE' });

    this.playbackQueue = Array.from(this.actionQueue);
    this.actionQueue.length = 0;
    this.currentIndex = -1;
    this.dispatching = true;
    this.recording = true;

    let delay = 0;
    this.playbackQueue.forEach((action) => {

      delay += action.delay;
      if (action.playback) {
        setTimeout(() => {
          this.store.dispatch(action);
          if (this.actionQueue.length === this.playbackQueue.length) {
            this.dispatching = false;
            this.recording = false;
          }
        }, delay);
      }
    });
  }

}
