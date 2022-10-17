import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/shared/types/interfaces';
import { BookingsService } from '../../services/bookings.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  bookingId!: string;
  actualBooking!: Booking;
  @ViewChild('content') content!: ElementRef;

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

  generatePDF() {

    var html = htmlToPdfmake(this.content.nativeElement.innerHTML);
    
    let docDefinition = {
      content: html
    };

    
    pdfMake.createPdf(docDefinition).open();

  } 


}
