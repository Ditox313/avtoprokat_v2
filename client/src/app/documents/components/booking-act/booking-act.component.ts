import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, User } from 'src/app/shared/types/interfaces';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BookingsService } from 'src/app/booking/services/bookings.service';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru'

@Component({
  selector: 'app-booking-act',
  templateUrl: './booking-act.component.html',
  styleUrls: ['./booking-act.component.css']
})
export class BookingActComponent implements OnInit {

  bookingId!: string;
  actualBooking!: Booking;
  actualUser!: User;
  yearDate: any;
  @ViewChild('content') content!: ElementRef;
  xsNumberSummAuto: string = '';

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
      this.xsNumberSummAuto = convertNumberToWordsRu(this.actualBooking.car.price_ocenka)

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
          fontSize: 7
        },
        fsz_b: { // we define the class called "red"
          fontSize: 11
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();

  } 

}
