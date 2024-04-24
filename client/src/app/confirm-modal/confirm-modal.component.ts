import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  entityName: string = '';
  message: string = '';
  isConfirmed = false;

  constructor(public bsModalRef: BsModalRef) {}
 
  confirm(): void {
    this.isConfirmed = true;
    this.bsModalRef?.hide();
  }
 
  decline(): void {
    this.bsModalRef?.hide();
  }
}
