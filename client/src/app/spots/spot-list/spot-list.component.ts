import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SpotService } from '../../_services/spot.service';
import { SpotParams } from '../../_models/spot-params';
import { Pagination } from '../../_models/pagination';
import { Spot } from '../../_models/spot';
import { CalendarComponent } from 'src/app/calendars/calendar/calendar.component';

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit {
  spots: Spot[] = [];
  @ViewChild(CalendarComponent, { static: true }) calendarComponent!: CalendarComponent;
  pagination: Pagination | undefined;
  spotParams: SpotParams | undefined;
  isCollapsed = true;

  constructor(private spotService: SpotService, private renderer: Renderer2) {
    this.spotParams = spotService.getSpotApprovedParams();
  }

  ngOnInit(): void {
    this.loadSpots('none');
  }

  loadSpots(selectedMonth: string) {
    if (this.spotParams) {
      this.spotParams.selectedMonth = selectedMonth;
      this.spotService.getApprovedSpots(this.spotParams).subscribe({
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
      this.spotService.setSpotApprovedParams(this.spotParams);
      this.loadSpots(this.spotParams.selectedMonth);
      this.scrollToElement('spots-wrapper');
    }
  }

  resetCalendar() {
    this.calendarComponent.resetMonthToggle();
  }

  private scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
