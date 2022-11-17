import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/cars/services/cars.service';
import { PaysService } from 'src/app/pays/services/pays.service';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Booking } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent implements OnInit {

  form!: FormGroup;
  bookingId!: string;
  actualBooking!: Booking;

  

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private rote: ActivatedRoute,
    private pays: PaysService,
    private cars: CarsService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      booking_end: new FormControl('', [Validators.required]),
      probeg_new: new FormControl(''),
    });

    // Достаем параметры
    this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });



    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.actualBooking = res;
      this.form.patchValue({
        booking_end: res.booking_end,
      });


      MaterialService.updateTextInputs();
    });
  }

  onSubmit()
  {

    
    
    // Создаем авто
    const car: any = {
      probeg: this.form.value.probeg_new,
    }
    
    this.cars.close(this.actualBooking.car._id, car).subscribe((car) => {
      MaterialService.toast('Сохранено');
      // this.router.navigate(['/cars-page']);
    });

}


}
