import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partner } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { ClientsService } from '../shared/services/clients.service';
import { PartnersService } from '../shared/services/partners.service';

// Шаг пагинации
  const STEP = 15

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
})
export class PartnersComponent implements OnInit {
  //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription;
  xspartners: Partner[] = [];
  offset: any = 0;
  limit: any = STEP;
  loading = false;
  noMoreCars: Boolean = false;
  constructor(
    private partners: PartnersService,
    private router: Router,
    private rote: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  // Получаем все кейсы
  public fetch() {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this.loading = true;
    this.Sub = this.partners.fetch(params).subscribe((clients) => {
      if (clients.length < STEP) {
        this.noMoreCars = true;
      }

      this.loading = false;
      this.xspartners = this.xspartners.concat(clients);
    });
  }

  loadmore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
    this.loading = false;
  }

  onDeleteCar(event: Event, xspartner: Partner): void {

    console.log(xspartner);
    
    event.stopPropagation();

    const dicision = window.confirm(`Удалить партнера?`);

    if (dicision) {
      this.partners.delete(xspartner._id).subscribe(
        (res) => {
          const idxPos = this.xspartners.findIndex(
            (p) => p._id === xspartner._id
          );
          this.xspartners.splice(idxPos, 1);
          MaterialService.toast(res.message);
        },
        (error) => {
          MaterialService.toast(error.error.message);
        }
      );
    }
  }
}
