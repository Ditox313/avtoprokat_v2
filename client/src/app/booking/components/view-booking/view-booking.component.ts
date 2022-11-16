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
import { PaysService } from 'src/app/pays/services/pays.service';

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
    dop_hours: '',
    checkedTarif: '',
    paidCount: 0
  };

  actualBooking!: Booking;

  bookingId!: string;

  form: any;

  booking_days_fin!: any;

  xsActualClient!: any;

  xstore$!: any;

  bookingStatus!: any;

  pays!: any;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private rote: ActivatedRoute,
    private pay: PaysService
  ) {}

  ngOnInit(): void {
    // Достаем параметры
    this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.actualBooking = res;
      
      this.summa.car = res.car;
      this.summa.sale = res.sale;
      this.summa.tariff = res.tariff;
      this.summa.booking_start = res.booking_start;
      this.summa.booking_end = res.booking_end;
      this.summa.summa = res.summa;
      this.summa.summaFull = res.summaFull;
      this.summa.booking_days = res.booking_days;
      this.summa.dop_hours = res.dop_hours;
      this.xsActualClient = res.client;

      this.bookings.getById(this.bookingId).subscribe((res) => {
        this.bookingStatus = res.status;
      });

      // Высчитываем какой тариф выбран
      this.checkedTarif(this.summa.booking_days)
    });

    this.pay.getPaysByBookingId(this.bookingId).subscribe((res) => {
      this.pays = res;
    });

    MaterialService.updateTextInputs();
  }

  toggleStatus(status: string) {
    

    if (+this.actualBooking.paidCount < (+this.summa.summaFull))
    {
      const dicision = window.confirm(`Бронь не оплачена! Вы уверены что хотите выдать автомобиль?`);

      if (dicision)
      {
        this.bookings.toggleStatus(status, this.bookingId).subscribe((res) => {
          this.bookingStatus = res.status;
          MaterialService.toast(`Новый статус брони -  ${status}`);
        });
      }
    }
    else{
      this.bookings.toggleStatus(status, this.bookingId).subscribe((res) => {
        this.bookingStatus = res.status;
        MaterialService.toast(`Новый статус брони -  ${status}`);
      });
    }
  }

  checkedTarif(countDay: any)
  {
    if (this.summa.booking_days < 3)
    {
      this.summa.checkedTarif = this.summa.car.days_1_2
    }
    if (this.summa.booking_days >= 3 && this.summa.booking_days < 7) {
      this.summa.checkedTarif = this.summa.car.days_3_7
    }
    if (this.summa.booking_days >= 7 && this.summa.booking_days < 14) {
      this.summa.checkedTarif = this.summa.car.days_8_14
    }
    if (this.summa.booking_days >= 14 && this.summa.booking_days < 31) {
      this.summa.checkedTarif = this.summa.car.days_15_30
    }
    if (this.summa.booking_days >= 31) {
      this.summa.checkedTarif = this.summa.car.days_31_more
    }
  }

}
