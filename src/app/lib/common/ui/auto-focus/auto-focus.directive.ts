import { AfterViewInit, Directive, ElementRef, Host, input } from "@angular/core";

@Directive({
  selector: '[cuAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  delay = input<number>(10);

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.el.nativeElement as HTMLElement;
      element.focus();
    }, this.delay());
  }
}
