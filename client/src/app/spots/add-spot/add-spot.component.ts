import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Spot } from 'src/app/_models/spot';
import { CountryService } from 'src/app/_services/country.service';
import { SpotService } from 'src/app/_services/spot.service';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.scss']
})
export class AddSpotComponent implements OnInit {
  addSpotForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  countries: string[] = [];
  monthsSelected: string[] = [];
  spot: Spot = {} as Spot;
  
  constructor(private fb: FormBuilder, private countryService: CountryService,
    private spotService: SpotService, private router: Router) {
    this.getCountries();
  }

  ngOnInit(): void {
    this.initializeForm();
  }


  addSpot() {
    this.spot = this.addSpotForm.value;
    this.setMonthValues(this.spot);
    this.spotService.addSpot(this.spot).subscribe({
      next: () => {
        this.spotService.spotCache.clear();
        this.router.navigateByUrl('/add-spot-success')
      },
      error: err => console.log(err)
    });
  }

  cancel() {
    console.log('cancelled');
  }

  initializeForm() {
    this.addSpotForm = this.fb.group({
      spotname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      country: ['', Validators.required],
      description: [''],
      isAdvanced: [''],
      isBeginner: [''],
    })
  }

  getCountries() {
    this.countryService.getCountries().subscribe({
      next: response => this.countries = response,
      error: err => console.log(err)
    });
  }

  setMonthValues(spot: Spot) {
    this.monthsSelected.forEach(month => {
      switch (month) {
        case 'january':
          this.spot.january = true;
          break;
        case 'february':
          this.spot.february = true;
          break;
        case 'march':
          this.spot.march = true;
          break;
        case 'april':
          this.spot.april = true;
          break;
        case 'may':
          this.spot.may = true;
          break;
        case 'june':
          this.spot.june = true;
          break;
        case 'july':
          this.spot.july = true;
          break;
        case 'august':
          this.spot.august = true;
          break;
        case 'september':
          this.spot.september = true;
          break;
        case 'october':
          this.spot.october = true;
          break;
        case 'november':
          this.spot.november = true;
          break;
        case 'december':
          this.spot.december = true;
          break;
        default:
          break;
      }
    })
  }

}
