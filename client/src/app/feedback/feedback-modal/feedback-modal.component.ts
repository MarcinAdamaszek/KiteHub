import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent {
  message = '';

  constructor(public bsModalRef: BsModalRef) {}

  hideModal() {
    this.bsModalRef.hide();
  }
}
