import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarsService } from 'src/app/cars/services/cars.service';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import { MaterialDatepicker } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';

import * as moment from 'moment';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.css'],
})
export class ShowBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('booking_start') booking_start__info!: ElementRef;
  @ViewChild('booking_end') booking_end__info!: ElementRef;

  bookingId!: string;

  form: any;

  xscars$!: any;

  booking_days_fin!: any

  xsclients$!: any;

  xsActualClient!: any;

  // Храним дату начала брони
  booking_start__x: MaterialDatepicker | any;

  // Храним дату окончания брони
  booking_end__x: MaterialDatepicker | any;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private cars: CarsService,
    private clients: ClientsService,
    private rote: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      car: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      booking_start: new FormControl('', [Validators.required]),
      booking_end: new FormControl('', [Validators.required]),
      place_start: new FormControl('', [Validators.required]),
      place_end: new FormControl('', [Validators.required]),
      tariff: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
    });

    // Достаем параметры
    this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });

    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.form.patchValue({
        car: JSON.stringify(res.car, null, 2),
        client:  JSON.stringify(res.client, null, 2),
        booking_start: res.booking_start,
        booking_end: res.booking_end,
        place_start: res.place_start,
        place_end: res.place_end,
        tariff: res.tariff,
        comment: res.comment,
      });

      this.xsActualClient = res.client;
      
    });

    this.xscars$ = this.cars.fetch();
    this.xsclients$ = this.clients.fetch();

    MaterialService.updateTextInputs();
  }

  ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement);
    MaterialService.updateTextInputs();

    this.booking_start__x = MaterialService.initDatepicker(
      this.booking_start__info,
      this.validate.bind(this)
    );
    this.booking_end__x = MaterialService.initDatepicker(
      this.booking_end__info,
      this.validate.bind(this)
    );
  }

  // Валидация
  validate() {}

  // Отправка формы
  onSubmit() {


    if (this.booking_start__x.date === undefined && this.booking_end__x.date !== undefined) {
      this.booking_days_fin = moment(this.booking_end__x.date, 'DD.MM.YYYY').diff(moment(this.form.value.booking_start, 'DD.MM.YYYY'), 'days')
    } else if (this.booking_end__x.date === undefined && this.booking_start__x.date !== undefined) {
      this.booking_days_fin = moment(this.form.value.booking_end, 'DD.MM.YYYY').diff(moment(this.booking_start__x.date, 'DD.MM.YYYY'), 'days')
    } else if ((this.booking_end__x.date && this.booking_start__x.date) === undefined) {
      this.booking_days_fin = moment(this.form.value.booking_end, 'DD.MM.YYYY').diff(moment(this.form.value.booking_start, 'DD.MM.YYYY'), 'days')
    }
    else if (this.booking_end__x.date !== undefined && this.booking_start__x.date !== undefined) {
      this.booking_days_fin = (this.booking_end__x.date - this.booking_start__x.date) /(1000 * 60 * 60 * 24)
    }



    const booking = {
      car: JSON.parse(this.form.value.car) ,
      client: JSON.parse(this.form.value.client),
      place_start: this.form.value.place_start,
      place_end: this.form.value.place_end,
      tariff: this.form.value.tariff,
      comment: this.form.value.comment,
      booking_start:
        this.booking_start__x.date === undefined
          ? this.form.value.booking_start
          : new Date(this.booking_start__x.date).toLocaleDateString('ru-RU'),
      booking_end:
        this.booking_end__x.date === undefined
          ? this.form.value.booking_end
          : new Date(this.booking_end__x.date).toLocaleDateString('ru-RU'),
      booking_days: this.booking_days_fin

    };
    
    this.bookings.update(this.bookingId, booking).subscribe((booking) => {
      MaterialService.toast('Бронь обновлена');
      // this.router.navigate(['/bookings-page']);
    });
  }
}
