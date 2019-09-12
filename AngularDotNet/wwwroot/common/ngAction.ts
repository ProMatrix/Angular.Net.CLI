import { Store } from '@ngxs/store';
import { NavigateTo } from '../src/app/side-nav.component.actions';
import { ChangeTabIndex, ToggleSpellChecking, UpdateTextMessage, ClearTextMessage } from '../features/mobileApis.component.actions';

export class Action {
  action: string;
  name: string;
  delay: number;
  payload: any;
  playback: boolean;
}

export class NgAction {
  private static instance: NgAction;
  private static store: Store;
  actionsQueue = new Array<Action>(); // fills as new actions are dispatched
  private currentIndex = -1;
  private recording = false;
  private dispatching = false;
  private lastTicks = 0;
  private continuation = false;

  constructor(private store: Store) {
    NgAction.store = store;
  }

  static getInstance(store: Store): NgAction {
    if (!NgAction.instance) {
      NgAction.instance = new NgAction(store);
    }
    return NgAction.instance;
  }

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

  appendToQueue(action: Action) {
    if (this.recording) {
      const currentTicks = new Date().getTime();
      if (this.lastTicks === 0) {
        action.delay = 1000;
      } else {
        action.delay = currentTicks - this.lastTicks;
      }
      this.lastTicks = currentTicks;

      this.actionsQueue.push(action);
      this.currentIndex = this.actionsQueue.length - 1;
    }
  }

  clearQueue() {
    this.actionsQueue.length = 0;
    this.currentIndex = -1;
  }

  getLatestIndex(): number {
    return this.currentIndex;
  }

  setLatestIndex(index: number) {
    this.currentIndex = index;
  }

  singleAction(index: number) {
    this.recording = false;
    this.dispatching = false;
    this.store.dispatch(this.actionsQueue[index]);
    this.currentIndex = index;
  }

  playback() {
    this.dispatching = true;
    this.recording = false;
    let playbackDelay: number;
    if (this.currentIndex === this.actionsQueue.length - 1) {
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

    for (let i = this.currentIndex; i < this.actionsQueue.length; i++) {
      const action = this.actionsQueue[i];
      if (action.playback) {
        if (this.continuation) {
          this.continuation = false;
        } else {
          delay += action.delay;
        }
        setTimeout(() => {
          this.currentIndex = i;
          this.store.dispatch(action);
          if (i === this.actionsQueue.length - 1) {
            this.dispatching = false;
          }
        }, delay);
      }
    }
  }

  replaceActionsQueue(actionsQueue: Array<Action>) {
    const newActionsArray = new Array<Action>();
    actionsQueue.forEach(action => {
      newActionsArray.push(this.createNewAction(action));
    });
    this.actionsQueue = newActionsArray;
    this.setLatestIndex(this.actionsQueue.length - 1);
  }

  createNewAction(action: Action): Action {
    switch (action.action) {
      case 'NavigateTo':
        return new NavigateTo(action.action, action.name, action.payload, action.playback, action.delay - 0);
      case 'ChangeTabIndex':
        return new ChangeTabIndex(action.action, action.name, action.payload, action.playback, action.delay - 0);
      case 'ToggleSpellChecking':
        return new ToggleSpellChecking(action.action, action.name, action.payload, action.playback, action.delay - 0);
      case 'UpdateTextMessage':
        return new UpdateTextMessage(action.action, action.name, action.payload, action.playback, action.delay - 0);
      case 'ClearTextMessage':
        return new ClearTextMessage(action.action, action.name, action.payload, action.playback, action.delay - 0);
      default:
        throw new Error('Action type not found!');
    }
  }

}
