import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent{
  selectedMonth: string = 'none';
  @Output() selectionChanged = new EventEmitter<string[]>();
  @Input() multiSelectionOn = false;
  @Input() monthsToggledOn: string[] = [];

  toggleSelected(month: string) {
    
    const index = this.monthsToggledOn.indexOf(month);

    if (index != -1) {
      this.monthsToggledOn.splice(index, 1);
      if (!this.multiSelectionOn) this.monthsToggledOn.push('none');
    }
    else {
      if (!this.multiSelectionOn) this.monthsToggledOn.pop();
      this.monthsToggledOn.push(month);
    }

    this.selectionChanged.emit(this.monthsToggledOn);
  }

  resetMonthToggle() {
    this.monthsToggledOn = ['none'];
    this.selectionChanged.emit(this.monthsToggledOn); 
  }

}
