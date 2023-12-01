import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private element: ElementRef) { }

  @HostListener('click')
  prevFunction() {
    var elm = this.element.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName("card");
    elm.prepend(item[item.length - 1]);
  }

}
