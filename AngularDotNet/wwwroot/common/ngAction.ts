import { Store } from '@ngxs/store';

export class Action {
  name: string;
  delay: number;
  payload: any;
  playback: boolean;
}

export class NgAction {

  constructor(private store: Store) { }

  actionQueue = new Array<Action>(); // fills as new actions are dispatched
  private currentIndex = -1;
  private recording = false;
  private dispatching = false;
  private lastTicks = 0;
  private continuation = false;

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
    this.dispatching = true;
    this.recording = false;
    let playbackDelay: number;
    if (this.currentIndex === this.actionQueue.length - 1) {
      this.continuation = false;
      playbackDelay = 2000;
      this.currentIndex = -1; // from the beginning
    } else {
      this.continuation = true;
      this.currentIndex++;
      playbackDelay = 500; // continuation
    }
    setTimeout(() => { this.playbackDelayed(); }, playbackDelay);
  }

  playbackDelayed() {
    this.store.dispatch({ type: '@@INIT' });
    this.store.dispatch({ type: '@@UPDATE_STATE' });
    let delay = 0;
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    }

    for (let i = this.currentIndex; i < this.actionQueue.length; i++) {
      const action = this.actionQueue[i];
      if (action.playback) {
        if (this.continuation) {
          this.continuation = false;
        } else {
          delay += action.delay;
        }
        setTimeout(() => {
          this.currentIndex = i;
          this.store.dispatch(action);
          if (i === this.actionQueue.length - 1) {
            this.dispatching = false;
          }
        }, delay);
      }
    }
  }

}
