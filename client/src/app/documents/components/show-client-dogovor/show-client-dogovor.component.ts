import { MaterialService } from 'src/app/shared/services/material.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';
import { map } from 'rxjs/operators';
import { Dogovor } from 'src/app/shared/types/interfaces';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-show-client-dogovor',
  templateUrl: './show-client-dogovor.component.html',
  styleUrls: ['./show-client-dogovor.component.css']
})
export class ShowClientDogovorComponent implements OnInit {
  form: any;
  dogovor_id: string;
  xs_actual_dogovor: Dogovor;

  constructor(
    private router: Router,
    private rote: ActivatedRoute,
    private documentsServices: DocumentsService,
  ) {}

  ngOnInit(): void {
    // Достаем параметры
    this.rote.params.subscribe((params) => {
      this.dogovor_id = params['id'];

      this.documentsServices.getDogovorById(params['id']).subscribe(res => {
        this.xs_actual_dogovor = res;
      })
    });



  }

  generatePDF() {
    var html = htmlToPdfmake(this.xs_actual_dogovor.content);

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

}
