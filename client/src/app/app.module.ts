import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { SpotListComponent } from './spot-list/spot-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SpotCardComponent } from './spot-card/spot-card.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarSmallComponent } from './calendar-small/calendar-small.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    SpotListComponent,
    SpotCardComponent,
    CalendarComponent,
    CalendarSmallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
