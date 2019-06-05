import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  template: '\n<br />\n<p><strong>Current count:</strong></p>\n<p><strong>{{ currentCount }}</strong></p>\n<button (click)=\"incrementCounter()\">Increment</button>\n'/* this was squashed */
})
export class CounterComponent {
  public currentCount = 0;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    document.addEventListener('portalChange', (event) => {
      this.incrementCounter();
    });
  }

  incrementCounter() {
    this.currentCount++;

    this.el.nativeElement
      .dispatchEvent(new CustomEvent('countChange', {
        detail: this.currentCount,
        bubbles: true
      }));

  }
}
