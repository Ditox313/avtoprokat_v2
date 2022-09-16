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
import { BookingsService } from 'src/app/booking/services/bookings.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Booking, Summa } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-add-pay',
  templateUrl: './add-pay.component.html',
  styleUrls: ['./add-pay.component.css']
})
export class AddPayComponent implements OnInit {
  bookingId!: string;
  form!: FormGroup;
  actualBooking!: Booking;
  defaultValue: string =  'Наличные'

  summa: Summa = {
    car: {},
    tariff: '',
    booking_start: '',
    booking_end: '',
    summa: '',
    booking_days: '',
    summaFull: '',
    dop_hours: '',
    checkedTarif: ''
  };

  arendaPayTypes:Array<any> = [
    // {
    //   type: "nul",
    //   value: "Наличные"
    // },
    {
      type: "terminal",
      value: "Терминал"
    },
    {
      type: "card",
      value: "На карту"
    },
    {
      type: "rs",
      value: "Р/с"
    },
  ]

  constructor(private router: Router, private rote: ActivatedRoute, private bookings: BookingsService,) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      arenda: new FormControl('', [Validators.required]),
      typeArenda: new FormControl('', [Validators.required]),
      zalog: new FormControl('', [Validators.required]),
      typeZalog: new FormControl('', [Validators.required]),
      // booking_start: new FormControl('', [Validators.required]),
      // booking_end: new FormControl('', [Validators.required]),
      // place_start: new FormControl('', [Validators.required]),
      // place_end: new FormControl('', [Validators.required]),
      // tariff: new FormControl('', [Validators.required]),
      // comment: new FormControl(''),
    });
    

    //Достаем параметры
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
      this.summa.dop_hours = res.dop_hours;


      // Высчитываем какой тариф выбран
      this.checkedTarif(this.summa.booking_days)
    });

    MaterialService.updateTextInputs();
  }



  checkedTarif(countDay: any) {
    if (this.summa.booking_days < 3) {
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



  onSubmit() {

    // const booking = {
    //   car: JSON.parse(this.form.value.car),
    //   client: JSON.parse(this.form.value.client),
    //   place_start: this.form.value.place_start,
    //   place_end: this.form.value.place_end,
    //   tariff: this.form.value.tariff,
    //   comment: this.form.value.comment,
    //   booking_start: this.form.value.booking_start,
    //   booking_end: this.form.value.booking_end,
    //   booking_days: (booking_end__x - booking_start__x) / (1000 * 60 * 60 * 24),
    //   summaFull: this.summa.summaFull,
    //   summa: this.summa.summa,
    //   dop_hours: this.summa.dop_hours,
    // };

    // Отправляем запрос
    // this.bookings.create(booking).subscribe((booking) => {
    //   MaterialService.toast('Бронь добавлена');
    //   this.router.navigate(['/bookings-page']);
    // });
  }

}
