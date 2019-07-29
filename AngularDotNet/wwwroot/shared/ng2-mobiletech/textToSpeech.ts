import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'text-to-speech',
  //#region template:
  template: `
  <div [@modalDialogTrigger] *ngIf="isVisible" class="modalDialog" style="width: 350px; height: 53px; " [style.top.px]="positionTop"  >
      <ng-content></ng-content>

      <button *ngIf="isClosable" (click)="closeDialog()" aria-label="Close" class="dialog__close-btn">X</button>
      <div style="text-align: center; ">
          <i class="fa fa-volume-up fa-2x" style="color: cornflowerblue; float:left; margin-left: 20px;"></i>
          <div class="btn-group" style="margin-right: 20px;">
              <button class="btn btn-primary btn-sm" [disabled]="!t2sOn" style="width: 75px;" (click)="onClickStop()">Stop</button>
              <button class="btn btn-primary btn-sm" [disabled]="!t2sOn" style="width: 75px;" (click)="onClickPause()">Pause</button>
              <button class="btn btn-primary btn-sm" [disabled]="t2sOn" style="width: 75px;"
              (click)="onClickStart()">{{ startButtonLabel }}</button>
          </div>
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
export class TextToSpeechComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() isClosable = true;
  @Input() isUnattended = false;
  @Input() isVisible: boolean;
  @Input() textToSpeak: string;
  @Input() owner: any;
  @Input() onChangeCallback: string;
  @Input() positionTop = 20;
  @Output() visibleChange = new EventEmitter<boolean>();

  private initalized = false;
  private t2sOn = false;
  private t2sPaused = false;
  private t2s: any;
  private startButtonLabel: string;
  featureIsAvailable = true;

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
      setTimeout(() => {
          this.initalized = true;
          this.setupT2S();
      }, 500);
  }

  public setupT2S() {
      try {
          this.t2s = window.speechSynthesis;
          const textToSpeak = new SpeechSynthesisUtterance('testing... 1, 2, 3');
      } catch (e) {
          this.featureIsAvailable = false;
          return;
      }
  }

  ngOnChanges() {
    if (!this.initalized) {
      return;
    }
    if (!this.t2sOn) {
        this.startButtonLabel = 'Start';
        this.onClickStart();
    }
  }

  closeDialog() {
    if (this.t2sOn || this.t2sPaused) {
      this.onClickStop();
    }
    this.isVisible = false;
    this.visibleChange.emit(this.isVisible);
  }

  public Start() {
    if (this.t2sPaused) {
        this.t2s.resume();
    } else {
        const textToSpeak = new SpeechSynthesisUtterance(this.textToSpeak);
        this.t2s.speak(textToSpeak);
        textToSpeak.onend = event => {
            this.onClickStop();
            this.cd.detectChanges();
        };
    }
    this.t2sOn = true;
    this.t2sPaused = false;
    this.owner[this.onChangeCallback]();
  }

  private onClickStart() {
    this.Start();
  }

  private onClickStop() {
    this.t2s.cancel();
    this.t2sOn = false;
    this.t2sPaused = false;
    this.startButtonLabel = 'Restart';
    this.owner[this.onChangeCallback]();
  }

  private onClickPause() {
    this.t2sOn = false;
    this.t2sPaused = true;
    this.t2s.pause();
    this.startButtonLabel = 'Resume';
    this.owner[this.onChangeCallback]();
  }

  ngOnDestroy() {
    if (this.t2sOn) {
      this.onClickStop();
    }
  }
}
