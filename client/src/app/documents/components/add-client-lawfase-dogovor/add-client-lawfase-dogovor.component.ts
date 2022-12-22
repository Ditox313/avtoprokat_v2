import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, Client_Law_Fase, Dogovor, User } from 'src/app/shared/types/interfaces';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { DocumentsService } from '../../services/documents.service';
import { DatePipe } from '@angular/common';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-add-client-lawfase-dogovor',
  templateUrl: './add-client-lawfase-dogovor.component.html',
  styleUrls: ['./add-client-lawfase-dogovor.component.css']
})
export class AddClientLawfaseDogovorComponent implements OnInit {

  datePipeString: string;
  ClientId!: string;
  actualClient!: Client_Law_Fase;
  actualUser!: User;
  clientDogovors!: Dogovor[];
  yearDate: any;
  xs_actual_date: any;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private clients: ClientsService,
    private documentsServices: DocumentsService,
    private router: Router,
    private rote: ActivatedRoute,
    private auth: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.rote.params.subscribe((params: any) => {
      this.ClientId = params['id'];
    });

    this.clients.getByIdLawfase(this.ClientId).subscribe((res) => {
      this.actualClient = res;
      
      this.yearDate = new Date(this.xs_actual_date);
      this.yearDate.setDate(this.yearDate.getDate() + (365*3));
    });


    this.auth.get_user().subscribe(user => {
      this.actualUser = user;
    })

    this.xs_actual_date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    this.documentsServices.getDogovorsById(this.ClientId).subscribe((res) => {
      this.clientDogovors = res;
    });
  }

  generatePDF() {
    var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

    let docDefinition = {
      content: [html],
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],
      styles: {
        fsz: {
          fontSize: 6
        },
        fsz_b: {
          fontSize: 10
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();

  }




  createDogovor() {

    let administrator = this.actualUser;
    delete administrator.password;

    const dogovor = {
      date_start: this.xs_actual_date,
      dogovor_number: this.xs_actual_date + '/СТС-' + this.actualClient.order,
      date_end: this.datePipe.transform(this.yearDate, 'yyyy-MM-dd'),
      client: this.actualClient,
      administrator: administrator,
      content: this.content.nativeElement.innerHTML,
      clientId: this.actualClient._id,
      state: 'active'
    }

    this.documentsServices.create_dogovor(dogovor).subscribe((dogovor) => {
      MaterialService.toast('Договор создан');
      this.router.navigate(['/show-client-lawfase//edit/', this.actualClient._id]);
    });
  }

}
