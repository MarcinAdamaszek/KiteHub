import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../account/login-modal/login-modal.component';
import { RegisterModalComponent } from '../account/register-modal/register-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  restrictedRoutes = ['/spots-moderation', '/edit-spot/', '/add-spot']
  model: any = {}
  bsModalRef: BsModalRef<LoginModalComponent | RegisterModalComponent> = 
    new BsModalRef<LoginModalComponent | RegisterModalComponent>();
    items: string[] = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];  

  constructor(public accountService: AccountService, 
    private modalService: BsModalService, private router: Router) {}

  ngOnInit(): void {
  }
  
  logout() {
    this.accountService.logout();
    const currentRoute = this.router.url.replace(/\d+$/, '');
    if (this.restrictedRoutes.includes(currentRoute)) this.router.navigateByUrl('spots');
  }

  openLoginModal() {
    const config = {
      class: 'modal-dialog-centered modal-sm'
    }
    this.bsModalRef = this.modalService.show(LoginModalComponent, config);
  }

  openRegisterModal() {
    const config = {
      class: 'modal-dialog-centered modal-sm'
    }
    this.bsModalRef = this.modalService.show(RegisterModalComponent, config);
  }
  
}
