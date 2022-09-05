import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CarsService } from 'src/app/cars/services/cars.service';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Booking, MaterialDatepicker, Summa } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
})
export class ViewBookingComponent implements OnInit {
  @ViewChild('tabs') tabs!: ElementRef;

  summa: Summa = {
    car: {},
    tariff: '',
    booking_start: '',
    booking_end: '',
    summa: '',
    booking_days: '',
    summaFull: '',
  };

  actualBooking!: Booking;

  bookingId!: string;

  form: any;

  booking_days_fin!: any;

  xsActualClient!: any;

  xstore$!: any;

  bookingStatus!: any;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private rote: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Достаем параметры
    this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.actualBooking = res;
      this.summa.car = res.car;
      this.summa.tariff = res.tariff;
      this.summa.booking_start = res.booking_start;
      this.summa.booking_end = res.booking_end;
      this.summa.summa = res.summa;
      this.summa.summaFull = res.summaFull;
      this.summa.booking_days = res.booking_days;
      this.xsActualClient = res.client;


      this.bookings.getById(this.bookingId).subscribe(res=>{
        this.bookingStatus = res.status;
      })
    });

    MaterialService.updateTextInputs();
  }




  toggleStatus(status: string) {
    this.bookings.toggleStatus(status, this.bookingId).subscribe((res) => {
      this.bookingStatus = res.status;
      console.log('После клика', this.bookingStatus);
      MaterialService.toast(`Новый статус брони -  ${status}`);
    });
  }


}
