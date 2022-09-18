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
import { MaterialDatepicker, Summa } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';

import * as moment from 'moment';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit, AfterViewInit {
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
  };

  bookingId!: string;
  bookingViewRef!: string;

  form: any;

  xscars$!: any;

  booking_days_fin!: any;

  xsclients$!: any;

  xsActualClient!: any;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private cars: CarsService,
    private clients: ClientsService,
    private rote: ActivatedRoute
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

      if (params.view) {
        this.bookingViewRef = params.view;
      }
    });

    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.form.patchValue({
        car: JSON.stringify(res.car, null, 2),
        client: JSON.stringify(res.client, null, 2),
        booking_start: res.booking_start,
        booking_end: res.booking_end,
        place_start: res.place_start,
        place_end: res.place_end,
        tariff: res.tariff,
        comment: res.comment,
      });

      this.summa.car = res.car;
      this.summa.tariff = res.tariff;
      this.summa.booking_start = res.booking_start;
      this.summa.booking_end = res.booking_end;
      this.summa.summa = res.summa;
      this.summa.summaFull = res.summaFull;
      this.summa.booking_days = res.booking_days;
      this.summa.dop_hours = res.dop_hours;
      

      this.xsActualClient = res.client;
    });

    this.xscars$ = this.cars.fetch();
    this.xsclients$ = this.clients.fetch();

    MaterialService.updateTextInputs();

    // Задаем минимальный параметр даты
    let booking_start: any = document.getElementById('booking_start');
    booking_start.min = new Date()
      .toISOString()
      .slice(0, new Date().toISOString().lastIndexOf(':'));

    let booking_end: any = document.getElementById('booking_end');
    booking_end.min = new Date()
      .toISOString()
      .slice(0, new Date().toISOString().lastIndexOf(':'));
  }

  ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement);
    MaterialService.updateTextInputs();
  }

  // При выборе атомобиля
  onChangeCar(e: any)
  {
    // Получаем выбранный автомобиль
    this.summa.car = JSON.parse(e)

    // Если все необходимое заполнено то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days < 3)
        {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
          
        }
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <7)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 7 && this.summa.booking_days <14)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 14 && this.summa.booking_days <31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      else if(this.summa.tariff === 'Россия')
      {
        if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.russia;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      
    }
  }


  // При выборе начала аренды
  bookingStartDate(e: any)
  {
    // Получаем начало аренды
    this.summa.booking_start = e.target.value

    // Получаем знапчения начала и конца аренды
    const booking_start__x: any = new Date(this.form.value.booking_start);
    const booking_end__x: any = new Date(this.form.value.booking_end);


    // Считаем дополнительные часы
    const dop_hour_days = (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24);
    
    if(!Number.isInteger(dop_hour_days))
    {
      this.summa.dop_hours = Math.floor(((booking_end__x - booking_start__x)/ (1000 * 60 * 60)) % 24);
    }
    else
    {
     this.summa.dop_hours = 0 
    }
    
    

    // Назначаем переменную для колличества дней аренды
    this.summa.booking_days = (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24);

    // Если все необходимое заполнено то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days < 3)
        {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
          
        }
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <7)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 7 && this.summa.booking_days <14)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 14 && this.summa.booking_days <31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      else if(this.summa.tariff === 'Россия')
      {
        if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.russia;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      
    }
  }


  // При выборе конца аренды
  bookingEndDate(e: any)
  {
    // Получаем конец аренды
    this.summa.booking_end = e.target.value

    // Получаем знапчения начала и конца аренды
    const booking_start__x: any = new Date(this.form.value.booking_start);
    const booking_end__x: any = new Date(this.form.value.booking_end);


    // Считаем дополнительные часы
    const dop_hour_days = (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24);
    
    if(!Number.isInteger(dop_hour_days))
    {
      this.summa.dop_hours = Math.floor(((booking_end__x - booking_start__x)/ (1000 * 60 * 60)) % 24);
    }
    else
    {
     this.summa.dop_hours = 0 
    }
    
    

    // Назначаем переменную для колличества дней аренды
    this.summa.booking_days = (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24);

    // Если все необходимое заполнено то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days < 3)
        {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
          
        }
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <7)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 7 && this.summa.booking_days <14)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 14 && this.summa.booking_days <31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      else if(this.summa.tariff === 'Россия')
      {
        if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.russia;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      
    }
  }


  // При ваыборе тарифа
  onChangeTariff(e: any)
  {
    // Получаем тариф
    this.summa.tariff = e
    
    // Если все необходимое заполнено то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days < 3)
        {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_1_2 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
          
        }
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <7)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_3_7 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 7 && this.summa.booking_days <14)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_8_14 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 14 && this.summa.booking_days <31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_15_30 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
        else if(this.summa.booking_days >= 31)
        {
            if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
            }
            if( this.summa.dop_hours >= 12 )
            {
              this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.days_31_more 
              this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
            }
            if (this.summa.dop_hours === 0 ) {
              this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more;
              this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
            }
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.mezgorod 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      else if(this.summa.tariff === 'Россия')
      {
        if(this.summa.dop_hours > 0 && this.summa.dop_hours < 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour * this.summa.dop_hours)
          }
          if( this.summa.dop_hours >= 12 )
          {
            this.summa.summa = Math.round(this.summa.booking_days) * this.summa.car.russia 
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog)
          }
          if (this.summa.dop_hours === 0 ) {
            this.summa.summa = this.summa.booking_days * this.summa.car.russia;
            this.summa.summaFull = +this.summa.summa + +this.summa.car.zalog;
          }
      }
      
    }
  }

  // Отправка формы
  onSubmit() {
    // Получаем знапчения начала и конца аренды
    const booking_start__x: any = new Date(this.form.value.booking_start);
    const booking_end__x: any = new Date(this.form.value.booking_end);

    if (booking_start__x === undefined && booking_end__x !== undefined) {
      this.booking_days_fin = moment(booking_end__x, 'DD.MM.YYYY').diff(
        moment(this.form.value.booking_start, 'DD.MM.YYYY'),
        'days'
      );
    } else if (booking_end__x === undefined && booking_start__x !== undefined) {
      this.booking_days_fin = moment(
        this.form.value.booking_end,
        'DD.MM.YYYY'
      ).diff(moment(booking_start__x, 'DD.MM.YYYY'), 'days');
    } else if ((booking_end__x && booking_start__x) === undefined) {
      this.booking_days_fin = moment(
        this.form.value.booking_end,
        'DD.MM.YYYY'
      ).diff(moment(this.form.value.booking_start, 'DD.MM.YYYY'), 'days');
    } else if (booking_end__x !== undefined && booking_start__x !== undefined) {
      this.booking_days_fin =
        (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24);
    }

    const booking = {
      car: JSON.parse(this.form.value.car),
      client: JSON.parse(this.form.value.client),
      place_start: this.form.value.place_start,
      place_end: this.form.value.place_end,
      tariff: this.form.value.tariff,
      comment: this.form.value.comment,
      booking_start: this.form.value.booking_start,
      booking_end: this.form.value.booking_end,
      booking_days: this.booking_days_fin,
      summaFull: this.summa.summaFull,
      summa: this.summa.summa,
      dop_hours: this.summa.dop_hours,
    };

    this.bookings.update(this.bookingId, booking).subscribe((booking) => {
      MaterialService.toast('Бронь обновлена');
      // this.router.navigate(['/bookings-page']);
    });
  }
}