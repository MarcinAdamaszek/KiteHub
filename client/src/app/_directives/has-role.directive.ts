import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];
  user: User = {} as User;

  constructor(private viewContainterRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, private accountService: AccountService)  { 
      accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if (user) this.user = user
        }  
      })
    }

  ngOnInit(): void {
    if (this.user.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainterRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainterRef.clear();
    }
  }

}
