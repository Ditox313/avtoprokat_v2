import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Dogovor } from 'src/app/shared/types/interfaces';
import { DocumentsService } from '../../services/documents.service';


// Шаг пагинации
const STEP = 3

@Component({
  selector: 'app-dogovor-list',
  templateUrl: './dogovor-list.component.html',
  styleUrls: ['./dogovor-list.component.css']
})
export class DogovorListComponent implements OnInit {
  @Input() clientId: string | undefined;
  xs_dogovors: Dogovor[] = [];
  offset: any = 0;
  limit: any = STEP;
  noMoreDogovors: Boolean = false;
  loading = false;
  Sub!: Subscription;



  constructor(
    private router: Router,
    private documentsServices: DocumentsService,
  ) { }

  ngOnInit(): void {
    // this.documentsServices.getDogovorsById(this.clientId).subscribe((res) => {
    //   this.xs_dogovors = res;
    // });
    this.fetch()
  }



  public fetch() {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientId
    }

    this.loading = true
    this.Sub = this.documentsServices.fetch(params).subscribe((dogovors) => {

      if (dogovors.length < STEP) {
        this.noMoreDogovors = true
      }

      this.loading = false
      this.xs_dogovors = this.xs_dogovors.concat(dogovors)
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


  loadmore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
    this.loading = false
  }

}
