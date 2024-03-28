import { Component, OnInit } from '@angular/core';
import { SpotService } from '../../_services/spot.service';
import { ActivatedRoute } from '@angular/router';
import { SpotDetails } from 'src/app/_models/spotDetails';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RateModalComponent } from 'src/app/rating/rate-modal/rate-modal.component';
import { AccountService } from 'src/app/_services/account.service';
import { ReviewService } from 'src/app/_services/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-spot-details',
  templateUrl: './spot-details.component.html',
  styleUrls: ['./spot-details.component.scss']
})
export class SpotDetailsComponent implements OnInit {
  spotDetails: SpotDetails = {} as SpotDetails;
  bsModalRef: BsModalRef<RateModalComponent> = 
    new BsModalRef<RateModalComponent>();
  spotId: number = 1;
  reviewContent = '';
  anyReviews = false;

  constructor(private spotService: SpotService, 
    private route: ActivatedRoute, private modalService: BsModalService,
    public accountService: AccountService, private reviewService: ReviewService,
      private toastr: ToastrService) {
    this.loadSpot();
  }

  ngOnInit(): void {
  }

  loadSpot() {
    const spotId = this.route.snapshot.paramMap.get('id');
    if (!spotId) return;
    
    this.spotService.getSpotDetails(parseInt(spotId)).subscribe({
      next: spotDetails => {
        if (spotDetails) this.spotDetails = spotDetails;
        if (this.spotDetails.reviews) {
          if (this.spotDetails.reviews.length == 0) {
            this.anyReviews = true;
          }
          this.spotDetails.reviews.forEach(r => {
            r.datePosted = new Date(r.datePosted);
          })
        }
        this.spotId = spotDetails.id;
      }
    })
  }

  openRateModal() {
    const config = {
      class: 'modal-dialog-centered modal-sm',
      initialState: {
        spotId: this.spotDetails.id.toString(),
        isRateSuccessful: false
      }
    }

    this.bsModalRef = this.modalService.show(RateModalComponent, config);

    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content?.isRateSuccessful) this.loadSpot();
      }
    })
  }

  postReview() {
    this.reviewService.postReview(this.reviewContent, this.spotId.toString())
      .subscribe({
        next: () => { 
          this.reviewContent = '';
          this.loadSpot();
        },
        error: err => console.log(err)
      })
  }

}
