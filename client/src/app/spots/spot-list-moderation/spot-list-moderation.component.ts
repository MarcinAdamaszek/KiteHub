import { Component, OnInit, Renderer2 } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Spot } from 'src/app/_models/spot';
import { SpotParams } from 'src/app/_models/spot-params';
import { SpotService } from 'src/app/_services/spot.service';

@Component({
  selector: 'app-spot-list-moderation',
  templateUrl: './spot-list-moderation.component.html',
  styleUrls: ['./spot-list-moderation.component.scss']
})
export class SpotListModerationComponent implements OnInit {
  spots: Spot[] = [];
  pagination: Pagination | undefined;
  spotParams: SpotParams = new SpotParams();

  constructor(private spotService: SpotService, private renderer: Renderer2) {
    this.spotParams = spotService.getSpotParams();
  }

  ngOnInit(): void {
    this.loadSpots('none');
  }

  loadSpots(selectedMonth: string) {
    if (this.spotParams) {
      this.spotParams.selectedMonth = selectedMonth;
      this.spotService.getSpots(this.spotParams, false).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.spots = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  pageChanged(event: any) {
    if (this.spotParams && this.spotParams?.pageNumber !== event.page) {
      this.spotParams.pageNumber = event.page;
      this.spotService.setSpotParams(this.spotParams);
      this.loadSpots(this.spotParams.selectedMonth);
      this.scrollToTop();
    }
  }

  refreshSpots() {
    this.spotService.spotCache.clear();
    this.spotService.spotApprovedCache.clear();
    this.loadSpots(this.spotParams.selectedMonth);
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
