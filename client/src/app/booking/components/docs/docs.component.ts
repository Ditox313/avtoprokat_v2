import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  bookingId!: string;
  actualBooking!: Booking;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private rote: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Достаем параметры
    this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });

    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.actualBooking = res;
    });
  }

}
