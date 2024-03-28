import { Component, OnInit } from '@angular/core';
import { SpotService } from '../../_services/spot.service';
import { SpotParams } from '../../_models/spot-params';
import { Pagination } from '../../_models/pagination';
import { Spot } from '../../_models/spot';

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit {
  spots: Spot[] = [];
  pagination: Pagination | undefined;
  spotParams: SpotParams | undefined;

  constructor(private spotService: SpotService) {
    this.spotParams = spotService.getSpotParams();
  }

  ngOnInit(): void {
    this.loadSpots('none');
  }

  loadSpots(selectedMonth: string) {
    if (this.spotParams) {
      this.spotParams.selectedMonth = selectedMonth;
      this.spotService.getSpots(this.spotParams).subscribe({
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
    }
  }

}
