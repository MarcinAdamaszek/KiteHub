import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { SpotListComponent } from './spot-list/spot-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpotCardComponent } from './spot-card/spot-card.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarSmallComponent } from './calendar-small/calendar-small.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/register-modal/register-modal.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HasRoleDirective } from './_directives/has-role.directive';


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
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
