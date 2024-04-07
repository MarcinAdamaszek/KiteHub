import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  selectedMonth: string = 'none';
  @Output() newMonthSelected = new EventEmitter<string[]>();
  @Input() multiSelectionOn = false;
  monthsToggledOn: string[] = [];

  ngOnInit(): void {
  }

  toggleSelected(month: string) {
    const index = this.monthsToggledOn.indexOf(month);

    

    if (index != -1) {
      this.monthsToggledOn.splice(index, 1);
      this.newMonthSelected.emit(['none']);
    }
    else {
      if (!this.multiSelectionOn) this.monthsToggledOn.pop();
      this.monthsToggledOn.push(month);
      this.newMonthSelected.emit(this.monthsToggledOn);
    }

    // if (this.multiSelectionOn) {
    //   if (index != -1) {
    //     this.monthsToggledOn.splice(index, 1);
    //   }
    //   else {
    //     this.monthsToggledOn.push(month);
    //   }
    // }
    // else {
    //   if (index != -1) {
    //     this.monthsToggledOn.pop();
    //     this.newMonthSelected.emit('none');
    //   }
    //   else {
    //     this.monthsToggledOn.push(month);
    //     this.newMonthSelected.emit(month);
    //   }
    // }

    
  }

}
