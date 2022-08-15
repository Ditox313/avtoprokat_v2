import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from '../shared/loader/loader.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { ShowBookingComponent } from './components/show-booking/show-booking.component';
import { BookingsService } from './services/bookings.service';
import { SiteLayoutComponent } from '../shared/layouts/components/site-layout/site-layout.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';


const routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
    children: [
      { path: 'bookings-page', component: BookingsComponent },
      { path: 'add-booking', component: AddBookingComponent },
      { path: 'show-booking/edit/:id', component: ShowBookingComponent },
    ],
  },
];

@NgModule({
  declarations: [BookingsComponent, AddBookingComponent, ShowBookingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(routes),
    LoaderModule,
    LayoutsModule,
  ],
  providers: [BookingsService],
})
export class BookingModule {}
