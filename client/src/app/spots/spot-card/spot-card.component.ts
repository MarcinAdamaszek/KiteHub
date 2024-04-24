import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spot } from '../../_models/spot';
import { SpotService } from 'src/app/_services/spot.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-spot-card',
  templateUrl: './spot-card.component.html',
  styleUrls: ['./spot-card.component.scss']
})
export class SpotCardComponent implements OnInit{
  @Output() spotManipulatedEvent = new EventEmitter<void>();
  @Input() spot: Spot = {} as Spot;
  @Input() moderation: boolean = false;
  bsModalRef: BsModalRef<ConfirmModalComponent> = 
    new BsModalRef<ConfirmModalComponent>();

  constructor(private spotService: SpotService, 
    private modalService: BsModalService, private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    
  }

  TruncateDescription(description: string) {
    if (description.length > 120) {
      return description.slice(0, 120) + '..';
    }
    else {
      return description;
    }
  }

  navigateToEdit(spot: Spot) {
    this.router.navigate(['/edit-spot/', this.spot.id]);
  }

  deleteSpot() {
    this.spotService.deleteSpot(this.spot.id).subscribe({
      next: () => {
        this.toastr.success('Spot deleted successfuly', this.spot.spotName);
        this.spotManipulatedEvent.emit();
      },
      error: err => console.log(err)
    })
  }

  approveSpot() {
    this.spotService.approveSpot(this.spot.id).subscribe({
      next: spot => {
        this.toastr.success('Spot approved succesfuly', spot.spotName);
        this.spotManipulatedEvent.emit();
      },
      error: err => console.log(err)
    })
  }

  openConfirmModal(action: string) {
    let message = '';

    if (action === 'approve') {
      message = 'You are about to approve spot:';
    }
    else if (action === 'delete') {
      message = 'You are about to delete spot:';
    }

    const config = {
      class: 'modal-sm',
      initialState: {
        entityName: this.spot.spotName,
        message: message
      }
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, config);

    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content?.isConfirmed) {
          if (action === 'approve') {
            this.approveSpot();
          }
          else if (action === 'delete') {
            this.deleteSpot();
          }
        }
      }
    })
  }


}
