import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Dogovor } from 'src/app/shared/types/interfaces';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-dogovor-list',
  templateUrl: './dogovor-list.component.html',
  styleUrls: ['./dogovor-list.component.css']
})
export class DogovorListComponent implements OnInit {
  @Input() clientId: string | undefined;
  xs_dogovors: Dogovor[];


  constructor(
    private router: Router,
    private documentsServices: DocumentsService,
  ) { }

  ngOnInit(): void {
    this.documentsServices.getDogovorsById(this.clientId).subscribe((res) => {
      this.xs_dogovors = res;
      
      
    });
    
  }


  DeleteDogovor(event: Event, xsdogovor: Dogovor): void {
    event.stopPropagation();

    const dicision = window.confirm(`Удалить договор?`);

    if (dicision) {
      this.documentsServices.delete_dogovor(xsdogovor._id).subscribe(
        (res) => {
          const idxPos = this.xs_dogovors.findIndex(
            (p) => p._id === xsdogovor._id
          );
          this.xs_dogovors.splice(idxPos, 1);
          MaterialService.toast(res.message);
        },
        (error) => {
          MaterialService.toast(error.error.message);
        }
      );
    }
  }

}
