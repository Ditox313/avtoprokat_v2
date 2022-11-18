import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarsService } from 'src/app/cars/services/cars.service';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import { MaterialDatepicker, Summa } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';


@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs') tabs!: ElementRef;



  form: any;

  // Храним все автомобили
  xscars$!: any;

  // Храним всех клиентов
  xsclients$!: any;


  // Храним объект суммы
  summa: Summa = {
    car: {},
    tariff: '',
    booking_start: '',
    booking_end: '',
    summa: '',
    booking_days: '',
    summaFull: '',
    dop_hours: ''
  }




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
      clear_auto: new FormControl(''),
      full_tank: new FormControl(''),
    });


    this.xscars$ = this.cars.fetch();
    this.xsclients$ = this.clients.fetch();


    MaterialService.updateTextInputs();

    // Задаем минимальный параметр даты
    let booking_start: any = document.getElementById('booking_start');
    booking_start.min = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));

    let booking_end: any = document.getElementById('booking_end');
    booking_end.min = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
  }

  ngAfterViewInit(): void {
    // Инициализируем табы
    MaterialService.initTabs(this.tabs.nativeElement);
    // Обновление инпутов формы
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
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <=7)
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
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
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
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=31)
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
        else if(this.summa.booking_days > 31)
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
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <=7)
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
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
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
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=31)
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
        else if(this.summa.booking_days > 31)
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
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <=7)
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
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
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
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=31)
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
        else if(this.summa.booking_days > 31)
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
        else if(this.summa.booking_days >= 3 && this.summa.booking_days <=7)
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
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
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
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=31)
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
        else if(this.summa.booking_days > 31)
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





  onSubmit() {
    
    // Получаем знапчения начала и конца аренды
    const booking_start__x: any = new Date(this.form.value.booking_start);
    const booking_end__x: any = new Date(this.form.value.booking_end);

    const booking = {
      car: JSON.parse(this.form.value.car),
      client: JSON.parse(this.form.value.client),
      place_start: this.form.value.place_start,
      place_end: this.form.value.place_end,
      tariff: this.form.value.tariff,
      comment: this.form.value.comment,
      booking_start: this.form.value.booking_start,
      booking_end: this.form.value.booking_end,
      booking_days: (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24),
      summaFull: Math.round(this.summa.summaFull) ,
      summa: Math.round(this.summa.summa),
      dop_hours: this.summa.dop_hours,
      dop_info_open: {
        clear_auto: this.form.value.clear_auto || false,
        full_tank: this.form.value.full_tank || false
      }
    };

    

    // Отправляем запрос
    this.bookings.create(booking).subscribe((booking) => {
      MaterialService.toast('Бронь добавлена');
      this.router.navigate(['/bookings-page']);
    });
  }
}