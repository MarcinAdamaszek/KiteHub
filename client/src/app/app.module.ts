import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { SpotListComponent } from './spots/spot-list/spot-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpotCardComponent } from './spots/spot-card/spot-card.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';
import { CalendarSmallComponent } from './calendars/calendar-small/calendar-small.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/register-modal/register-modal.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { RepeatDirective } from './_directives/repeat.directive';
import { SpotDetailsComponent } from './spots/spot-details/spot-details.component';
import { RatingStarsComponent } from './rating/rating-stars/rating-stars.component';
import { ReviewComponent } from './review/review.component';
import { RateModalComponent } from './rating/rate-modal/rate-modal.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    SpotListComponent,
    SpotCardComponent,
    CalendarComponent,
    CalendarSmallComponent,
    LoginModalComponent,
    RegisterModalComponent,
    TextInputComponent,
    ServerErrorComponent,
    NotFoundComponent,
    HasRoleDirective,
    RepeatDirective,
    SpotDetailsComponent,
    RatingStarsComponent,
    ReviewComponent,
    RateModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
