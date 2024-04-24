import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../_models/review';
import { ReviewService } from '../../_services/review.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Output() reviewManipulatedEvent = new EventEmitter<void>();
  @Input() moderation: boolean = false;
  bsModalRef: BsModalRef<ConfirmModalComponent> = 
    new BsModalRef<ConfirmModalComponent>();
  @Input() review: Review = {
    id: 0,
    content: '',
    authorName: '',
    datePosted: new Date(),
    isApproved: false
  };

  constructor(private reviewService: ReviewService, 
    private modalService: BsModalService, private toastr: ToastrService) {}

  truncateDate(date: string) {
    return date.slice(0, 10);
  }

  openConfirmModal(action: string) {
    let message = '';

    if (action === 'approve') {
      message = 'You are about to approve the review';
    }
    else if (action === 'delete') {
      message = 'You are about to delete the review';
    }

    const config = {
      class: 'modal-sm',
      initialState: {
        entityName: '',
        message: message
      }
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, config);

    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content?.isConfirmed) {
          if (action === 'approve') {
            this.approveReview();
          }
          else if (action === 'delete') {
            this.deleteReview();
          }
        }
      }
    })
  }

  deleteReview() {
    if (this.review.id != 0) {
      this.reviewService.deleteReview(this.review.id).subscribe({
        next: () => {
          this.toastr.success("Review has been deleted successfuly", "Deleted");
          this.reviewManipulatedEvent.emit();
        }
      })
    }
  }

  approveReview() {
    if (this.review.id != 0) {
      this.reviewService.approveReview(this.review.id).subscribe({
        next: () => {
          this.toastr.success("Review has been approved successfuly", "Approved");
          this.reviewManipulatedEvent.emit();
        }
      })
    }
  }

}
