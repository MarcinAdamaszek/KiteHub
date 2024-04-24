import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpotForm } from 'src/app/_models/spotForm';
import { CountryService } from 'src/app/_services/country.service';
import { SpotService } from 'src/app/_services/spot.service';
import { setMonthFlags } from 'src/app/_utils/utils';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.scss']
})
export class AddSpotComponent implements OnInit {
  addSpotForm: FormGroup = new FormGroup({});
  spot: SpotForm = {} as SpotForm;
  validationErrors: string[] | undefined;
  countries: string[] = [];
  monthsSelected: string[] = [];
  title = 'Success!';
  message = `Thank you for contributing! Your spot has been successfully added to our platform. However, 
      it is currently pending approval by our team of moderators. 
      We strive to ensure the quality and accuracy of all submissions before they are made public.

      Please note that the approval process may take some time as we carefully review each submission. 
      Once approved, your spot will be visible to all users of our platform.`;
  feedbackRoute = '/spots';
  
  constructor(private fb: FormBuilder, private countryService: CountryService,
    private spotService: SpotService, private router: Router) {
    this.getCountries();
  }

  ngOnInit(): void {
    this.initializeForm();
  }


  addSpot() {
    this.spot = this.addSpotForm.value;

    setMonthFlags(this.spot, this.monthsSelected);

    this.spotService.addSpot(this.spot).subscribe({
      next: () => {
        this.spotService.spotCache.clear();
        this.spotService.spotApprovedCache.clear();
        
        this.router.navigateByUrl('/action-feedback', { state: { 
          title: this.title,
          message: this.message,
          route: this.feedbackRoute,
        }});
      },
      error: err => console.log(err)
    });
  }

  cancel() {
    this.router.navigateByUrl('/spots');
  }

  initializeForm() {
    this.addSpotForm = this.fb.group({
      spotname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      country: ['', Validators.required],
      latitude: ['', [ Validators.required, Validators.pattern(/^-?\d{1,2}(\.\d{1,7})?$/)]],
      longitude: ['', [Validators.required, Validators.required, Validators.pattern(/^-?\d{1,2}(\.\d{1,7})?$/)]],
      description: [''],
      isAdvanced: [ false ],
      isBeginner: [ false ],
    })
  }

  getCountries() {
    this.countryService.getCountries().subscribe({
      next: response => this.countries = response,
      error: err => console.log(err)
    });
  }

}
