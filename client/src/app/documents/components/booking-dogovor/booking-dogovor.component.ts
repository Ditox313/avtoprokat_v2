import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, User } from 'src/app/shared/types/interfaces';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BookingsService } from 'src/app/booking/services/bookings.service';

@Component({
  selector: 'app-booking-dogovor',
  templateUrl: './booking-dogovor.component.html',
  styleUrls: ['./booking-dogovor.component.css']
})
export class BookingDogovorComponent implements OnInit {

  bookingId!: string;
  actualBooking!: Booking;
  actualUser!: User;
  yearDate: any;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private bookings: BookingsService,
    private router: Router,
    private rote: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // Достаем параметры
    this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });

    this.bookings.getById(this.bookingId).subscribe((res) => {
      this.actualBooking = res;

      this.yearDate = new Date(this.actualBooking.date);
      this.yearDate.setDate(this.yearDate.getDate() + 365);
    });


    this.auth.get_user().subscribe(user => {
      this.actualUser = user;
    })



  }

  generatePDF() {
    var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

    let docDefinition = {
      content: [html],
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],
      styles: {
        fsz: { // we define the class called "red"
          fontSize: 6
        },
        fsz_b: { // we define the class called "red"
          fontSize: 10
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();

  } 


}