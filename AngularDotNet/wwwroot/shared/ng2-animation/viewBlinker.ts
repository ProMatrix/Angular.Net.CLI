import { Component,  Input } from "@angular/core";
import { trigger, state, animate, transition, style } from "@angular/animations";

@Component({
    selector: "view-blinker",
    template: `
    <div [@visibilityChanged]="visibility" [style.visibility]="initalized ? 'visible' : 'hidden' ">
      <ng-content></ng-content>    
    </div>
  `,
    animations: [
        trigger("visibilityChanged", [
            state("shown", style({ opacity: 1 })),
            state("hidden", style({ opacity: 0 })),
            transition("* => *", animate(".25s"))
        ])
    ]
})
export class ViewBlinker {

    @Input() blinking = false;
    @Input() visibleWhenNotBlinking = false;
    visibility = "hidden";
    initalized = false;
    intervalId: any;

    private ngAfterViewInit() {
        setTimeout(() => {
            this.initalized = true;
        }, 500);
    }

    private startBlinking() {
        this.intervalId = setInterval(() => {
            if (!this.blinking) {
                clearInterval(this.intervalId);
                return;
            }
            if (this.visibility === "shown")
                this.visibility = "hidden";
            else
                this.visibility = "shown";
        }, 750);
    }

    private ngOnChanges() {
        if (this.blinking)
            this.startBlinking();
        this.visibility = this.visibleWhenNotBlinking ? "shown" : "hidden";
    }
}