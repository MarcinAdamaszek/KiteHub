import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  selectedMonth: string = 'none';
  @Output() newMonthSelected = new EventEmitter<string>();

  ngOnInit(): void {
  }

  toggleSelected(month: string) {

    let newSelectedMonth: string;

    if (this.selectedMonth === month) {
      newSelectedMonth = 'none';
    }
    else {
      newSelectedMonth = month;
    }

    this.selectedMonth = newSelectedMonth;
    this.newMonthSelected.emit(newSelectedMonth);
  }
  
}
