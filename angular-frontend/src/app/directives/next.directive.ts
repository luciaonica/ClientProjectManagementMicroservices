import { Directive,ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private element: ElementRef) { 
    
  }

  @HostListener('click')
  nextFunction() {
    var elm = this.element.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName("card");
    elm.append(item[0]);
  }

}
