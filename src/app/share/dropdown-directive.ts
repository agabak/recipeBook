import { Directive, ElementRef, Host, HostBinding, HostListener, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
@HostBinding('class.open') isOpen:boolean = false;

@HostListener('click') toggleIsOpen() {
     this.isOpen = !this.isOpen;
}
}
