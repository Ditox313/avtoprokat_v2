import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AddCarComponent } from './cars-page/add-car/add-car.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ShowCarComponent } from './cars-page/show-car/show-car.component';
import { PartnersComponent } from './partners/partners.component';
import { AddPartnerComponent } from './partners/add-partner/add-partner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CarsPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    OverviewPageComponent,
    AddCarComponent,
    LoaderComponent,
    ShowCarComponent,
    PartnersComponent,
    AddPartnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
