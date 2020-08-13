import {Directive, HostListener, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Directive({ selector: '[scroll]' })
export class ScrollDirective {
  @Input() scrollValue: any;
  @Output() newValue = new EventEmitter<any>();
  currentPosition = 0;
  constructor(private elRef: ElementRef) {
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event){
    this.scrollValue ? this.currentPosition = this.scrollValue : this.currentPosition = (document.body.getBoundingClientRect()).top;
    this.newValue.emit(this.currentPosition);
    if ((document.body.getBoundingClientRect()).top > this.currentPosition ){
      this.elRef.nativeElement.classList.remove('elementScroll');
      this.elRef.nativeElement.classList.add('element');
    }
    else{
      this.elRef.nativeElement.classList.remove('element');
      this.elRef.nativeElement.classList.add('elementScroll');
    }
  }
}
