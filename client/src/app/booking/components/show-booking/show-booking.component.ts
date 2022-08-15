import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/cars/services/cars.service';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import { MaterialDatepicker } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.css'],
})
export class ShowBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('booking_start') booking_start__info!: ElementRef;
  @ViewChild('booking_end') booking_end__info!: ElementRef;

  form: any;

  xscars$!: any;

  xsclients$!: any;

  // Храним дату начала брони
  booking_start__x: MaterialDatepicker | any;

  // Храним дату окончания брони
  booking_end__x: MaterialDatepicker | any;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private cars: CarsService,
    private clients: ClientsService
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
    // Создаем авто
    const booking = {
      car: this.form.value.car,
      client: this.form.value.client,
      place_start: this.form.value.place_start,
      place_end: this.form.value.place_end,
      tariff: this.form.value.tariff,
      comment: this.form.value.comment,
      booking_start: new Date(this.booking_start__x.date).toLocaleDateString(
        'ru-RU'
      ),
      booking_end: new Date(this.booking_end__x.date).toLocaleDateString(
        'ru-RU'
      ),
    };

    this.bookings.create(booking).subscribe((booking) => {
      MaterialService.toast('Бронь добавлена');
      this.router.navigate(['/bookings-page']);
    });
  }
}
