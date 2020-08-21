import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CounterComponent} from "./Counter";
import * as React from 'react';

import * as ReactDOM from 'react-dom';

const containerElementName = 'counterWrapper';

@Component({
  selector: 'counter-component',
  template: `<span #${containerElementName}></span>`,
  styleUrls: ['./Counter.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CounterWrapper implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, {static: false}) containerRef: ElementRef;

  @Input() public counter = 0;
  @Output() public componentClick = new EventEmitter<void>();
  @Output() public componentDecrease = new EventEmitter<void>();

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
    this.handleDivDecrease = this.handleDivDecrease.bind(this);
  }

  public handleDivClicked() {
    if (this.componentClick) {
      this.componentClick.emit();
      this.render();
    }
  }

  public handleDivDecrease() {
    if (this.componentDecrease) {
      this.componentDecrease.emit();
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const {counter} = this;

    ReactDOM.render(<div className={'i-am-classy'}>
      <CounterComponent counter={counter} onClick={this.handleDivClicked} onDecrease={this.handleDivDecrease}/>
    </div>, this.containerRef.nativeElement);
  }
}
