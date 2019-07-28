import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

export class ThisWindow extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
  mozSpeechRecognition: any;
  msSpeechRecognition: any;
}

declare var window: ThisWindow;

@Component({
  selector: 'speech-to-text',
  //#region template:
  template: `
  <div [@modalDialogTrigger] *ngIf="isVisible" class="modalDialog" style="width: 350px; height: 73px; " [style.top.px]="positionTop"  >
      <ng-content></ng-content>
      <button *ngIf="isClosable" (click)="closeDialog()" aria-label="Close" class="dialog__close-btn">X</button>
      <div style="text-align: center; ">
          <i class="fa fa-microphone fa-2x" style="color: cornflowerblue; float:left; margin-left: 20px;"></i>
          <div class="btn-group" style="margin-right: 20px;">
              <button class="btn btn-primary btn-sm" [disabled]="!s2tOn" style="width: 75px;" (click)="onClickStop()">Stop</button>
              <button class="btn btn-primary btn-sm" [disabled]="!s2tOn" style="width: 75px;" (click)="onClickPause()">Pause</button>
              <button class="btn btn-primary btn-sm" [disabled]="s2tOn" style="width: 75px;"
              (click)="onClickStart()">{{ startButtonLabel }}</button>
          </div>
          <br />
          <div id="debugText" style="color: red; font-weight: bold; overflow: hidden; "></div>
        </div>
  </div>
  <div *ngIf="isVisible" class="overlay" (click)="closeDialog()"></div>
  `,
  // #endregion
  //#region styles:
  styles: [`
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 999;
  }
  .modalDialog {
    z-index: 1000;
    position: fixed;
    right: 0;
    left: 0;
    top: 20px;
    margin-top: 100px;
    margin-right: auto;
    margin-left: auto;
    height: 200px;
    width: 90%;
    max-width: 520px;
    background-color: #fff;
    padding: 12px;
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
    -ms-border-radius: 5px !important;
    border-radius: 25px !important;
  }
  @media (min-width: 768px) {
    .modalDialog {
      top: 40px;
    }
  }
  .dialog__close-btn {
    border: 0;
    background: none;
    color: #2d2d2d;
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 1.2em;
    cursor: pointer;
  }
  `],
  // #endregion
  animations: [
      trigger('modalDialogTrigger', [
          transition('void => *', [
              style({ transform: 'scale3d(.3, .3, .3)' }),
              animate(100)
          ]),
          transition('* => void', [
              animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
          ])
      ])
  ]
})
export class SpeechToText {
  @Input() isClosable = true;
  @Input() isVisible: boolean;
  @Input() owner: any;
  @Input() onResultsCallback: string;
  @Input() onRestartCallback: string;
  @Input() positionTop = 20;
  @Input() autoRetry = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  private initalized = false;
  private s2tOn = false;
  private s2tPaused = false;
  private s2t: any;
  private newSentence: boolean;
  private startButtonLabel: string;
  featureIsAvailable = true;

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  private ngAfterViewInit() {
      setTimeout(() => {
          this.initalized = true;
          this.setupSpeechToText();
      }, 500);
  }

  private debugText(message: string) {
      setTimeout(() => {
          try {
              const dt = document.getElementById('debugText');
              dt.innerHTML = message;
          } catch (e) { }});
  }

  private setupSpeechToText() {
      try {
        this.s2t = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
      } catch (e) {
          this.featureIsAvailable = false;
          return;
      }

      this.s2t.lang = 'en-US';
      this.s2t.interimResults = false;
      this.s2t.continuous = true;
      this.s2t.maxAlternatives = 5;
      this.s2t.onresult = event => {
          this.onResultsS2T(event);
      };
      this.s2t.onspeechend = event => {
          this.endS2T();
      };

      this.s2t.onend = event => {
          this.endS2T();
      };

      this.s2t.onerror = event => {
          this.errorS2T(event.error);
      };

      this.s2t.onnomatch = event => {
          this.noMatchS2T();
      };
  }

  private ngOnChanges() {
    if (!this.initalized) {
      return;
    }
    if (!this.s2tOn) {
        this.startButtonLabel = 'Start';
        this.onClickStart();
    }
  }

  closeDialog() {
    if (this.s2tOn || this.s2tPaused) {
      this.onClickStop();
    }
    this.isVisible = false;
    this.visibleChange.emit(this.isVisible);
  }

  onClickStart() {
      this.debugText('');
      this.startS2T();
      this.s2tOn = true;
  }

  onClickStop() {
      this.s2t.stop();
      this.s2tOn = false;
      this.s2tPaused = false;
      this.startButtonLabel = 'Restart';
  }

  onClickPause() {
      this.s2t.stop();
      this.s2tOn = false;
      this.s2tPaused = true;
      this.startButtonLabel = 'Resume';
  }

  private endS2T() {
      if (this.s2tOn) {
          this.s2tPaused = true;
          try { this.s2t.start(); } catch (e) {}
      }
  }

  private startS2T() {
      if (!this.s2tOn) {
          if (!this.s2tPaused) {
              this.owner[this.onRestartCallback]();
              this.newSentence = true;
          }
          this.s2t.start();
      }
  }

  private errorS2T(message) {
    this.onClickPause();
    this.debugText('System Error: ' + message);
    this.cd.detectChanges();
    if (!this.autoRetry) {
      return;
    }
    this.debugText('Auto Retry');
    setTimeout(() => {
        this.onClickStart();
    }, 1000);
  }

  private noMatchS2T() {
      this.debugText('System Error: Cannot recognize speech!');
  }

  private onResultsS2T(event) {
      let justSpoken = event.results[event.results.length - 1][0].transcript;
      justSpoken = this.speechRules(justSpoken);
      this.owner[this.onResultsCallback](justSpoken);
  }

  private speechRules(inputString: string): string {
      inputString = inputString.charAt(0).toUpperCase() + inputString.slice(1);
      return inputString;
  }

  private ngOnDestroy() {
    if (this.s2tOn) {
      this.onClickStop();
    }
  }
}
