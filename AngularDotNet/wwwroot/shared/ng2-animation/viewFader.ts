import { Component, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
    selector: 'view-fader',
    template: `
    <div [@visibilityChanged]="visibility" [style.visibility]="initalized ? 'visible' : 'hidden' ">
      <ng-content></ng-content>
    </div>
  `,
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('* => *', animate('.5s'))
        ])
    ]
})
export class ViewFader {

    @Input() isViewVisible = false;
    visibility = 'hidden';
    initalized = false;

    constructor() {

    }

    private ngAfterViewInit() {
        setTimeout(() => {
          this.initalized = true;

          if (this.isViewVisible) {
            this.visibility = 'shown';
          } else {
            this.visibility = 'hidden';
          }
        }, 500);
    }

    private ngOnChanges() {
      if (!this.initalized) {
        return;
      }
      this.visibility = this.isViewVisible ? 'shown' : 'hidden';
    }
}
