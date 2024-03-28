import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective implements OnInit {
  @Input() appRepeat: number = 1;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    for (let i = 0; i < this.appRepeat; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
