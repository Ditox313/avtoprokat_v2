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
  @ViewChild('booking_start') booking_start__info!: ElementRef;
  @ViewChild('booking_end') booking_end__info!: ElementRef;


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
    summaFull: ''
  }

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
    // Инициализируем табы
    MaterialService.initTabs(this.tabs.nativeElement);
    // Обновление инпутов формы
    MaterialService.updateTextInputs();

    // Инициализация datepicker
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



  onChangeCar(e: any)
  {
    // Получаем выбранный автомобиль
    this.summa.car = JSON.parse(e)

    // Если все выбрано
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      // Если выбран тариф город считаем суммы для тарифов
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days <= 2)
        {
          this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2 
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 2 && this.summa.booking_days <=7)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      else if(this.summa.tariff === 'Россия')
      {
        this.summa.summa = this.summa.booking_days * this.summa.car.russia
        this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      
    }
  }


  bookingStartDate(e: any)
  {
    // Получаем начало аренды
    this.summa.booking_start = e.target.value

    // Назначаем переменную для колличества дней аренды
    this.summa.booking_days = (this.booking_end__x.date - this.booking_start__x.date) / (1000*60*60*24)

    // Если все необходимое заполнено  то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days <= 2)
        {
          this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2 
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 2 && this.summa.booking_days <=7)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      else if(this.summa.tariff === 'Россия')
      {
        this.summa.summa = this.summa.booking_days * this.summa.car.russia
        this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      
    }
  }


  bookingEndDate(e: any)
  {
    // Получаем конец аренды
    this.summa.booking_end = e.target.value

    // Назначаем переменную для колличества дней аренды
    this.summa.booking_days = (this.booking_end__x.date - this.booking_start__x.date) / (1000*60*60*24)

    // Если все необходимое заполнено то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days <= 2)
        {
          this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2 
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 2 && this.summa.booking_days <=7)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
      }
      else if(this.summa.tariff === 'Межгород')
      {
          this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      else if(this.summa.tariff === 'Россия')
      {
        this.summa.summa = this.summa.booking_days * this.summa.car.russia
        this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      
    }
  }


   onChangeTariff(e: any)
  {
    // Получаем тариф
    this.summa.tariff = e
    
    // Если все необходимое заполнено то считаем суммы для тарифов
    if(this.summa.car !== {} && this.summa.tariff !== '' && this.summa.booking_start !== '' && this.summa.booking_end !== '')
    {
      if(this.summa.tariff === 'Город')
      {
        if(this.summa.booking_days <= 2)
        {
          this.summa.summa = this.summa.booking_days * this.summa.car.days_1_2 
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 2 && this.summa.booking_days <=7)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_3_7
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 7 && this.summa.booking_days <=14)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_8_14
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 14 && this.summa.booking_days <=30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_15_30
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
        else if(this.summa.booking_days > 30)
        {
            this.summa.summa = this.summa.booking_days * this.summa.car.days_31_more
            this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
        }
      } 
      else if(this.summa.tariff === 'Межгород')
      {
          this.summa.summa = this.summa.booking_days * this.summa.car.mezgorod
          this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      else if(this.summa.tariff === 'Россия')
      {
        this.summa.summa = this.summa.booking_days * this.summa.car.russia
        this.summa.summaFull = +this.summa.summa + (+this.summa.car.zalog) + (+this.summa.car.price_dop_hour)
      }
      
    }
  }





  onSubmit() {
    // Формируем бронь
    const booking = {
      car: JSON.parse(this.form.value.car),
      client: JSON.parse(this.form.value.client),
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
      booking_days: (this.booking_end__x.date - this.booking_start__x.date) / (1000*60*60*24),
      summaFull: this.summa.summaFull,
      summa: this.summa.summa
    };
    

    // Отправляем запрос
    this.bookings.create(booking).subscribe((booking) => {
      MaterialService.toast('Бронь добавлена');
      this.router.navigate(['/bookings-page']);
    });
  }


}