import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss']
})
export class RateModalComponent {
  spotId: string = '1';
  selectedRate: string = '5'
  isRateSuccessful = false;

  constructor(public bsModalRef: BsModalRef,
    private rateService: RateService) {}

  submitRate(score: string) {
    this.rateService.addRate(score, this.spotId).subscribe({
      next: () => {
        this.cancel();
        this.isRateSuccessful = true;
      },
      error: err => console.log(err)
    })
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
