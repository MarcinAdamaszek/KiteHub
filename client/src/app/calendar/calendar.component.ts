import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedMonth: string = '';

  ngOnInit(): void {
    
  }

  toggleSelectedOn(month: string) {

    if (this.selectedMonth === month) {
      this.selectedMonth = '';
    }
    else {
      this.selectedMonth = month;
    }
  }
  
}
