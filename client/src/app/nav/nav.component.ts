import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = false;
  model: any = {}
  bsModalRef: BsModalRef<LoginModalComponent | RegisterModalComponent> = 
    new BsModalRef<LoginModalComponent | RegisterModalComponent>();

  constructor(public accountService: AccountService, 
    private modalService: BsModalService) {}

  ngOnInit(): void {
  }
  
  logout() {
    this.accountService.logout();
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
