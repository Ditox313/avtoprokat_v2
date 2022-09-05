import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Car } from 'src/app/shared/types/interfaces';
import { CarsService } from '../../services/cars.service';
import { Store, select } from '@ngrx/store';
import {
  carsAddAction,
  carsDeleteAction,
} from '../../store/actions/cars.action';

// Шаг пагинации
const STEP = 10;

@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.css'],
})
export class CarsPageComponent implements OnInit {
  //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription;
  xscars: Car[] = [];
  offset: any = 0;
  limit: any = STEP;
  loading = false;
  noMoreCars: Boolean = false;

  constructor(
    private cars: CarsService,
    private rote: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  // public objFor(arr: Car[]) {
  //   console.log('111', arr);
    
  //   let storeCars = [];
  //   for (var key in arr) {
  //     if (key !== 'type') {
  //       storeCars.push(arr[key]);
  //     }
  //   }

  //   return storeCars;
  // }

  // Получаем все кейсы
  public fetch() {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this.loading = true;

    this.Sub = this.cars.fetch(params).subscribe((cars) => {
      this.store.dispatch(carsAddAction({ cars: cars }));

      if (cars.length < STEP) {
        this.noMoreCars = true;
      }

      this.loading = false;
      this.xscars = this.xscars.concat(cars);
    });
  }

  loadmore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
    this.loading = false;
  }

  // Удалить позицию
  onDeleteCar(event: Event, xscar: Car): void {
    event.stopPropagation();

    const dicision = window.confirm(`Удалить автомобиль?`);

    if (dicision) {
      this.cars.delete(xscar._id).subscribe(
        (res) => {
          const idxPos = this.xscars.findIndex((p) => p._id === xscar._id);
          this.xscars.splice(idxPos, 1);

          this.store.dispatch(carsDeleteAction({ cars: this.xscars }));

          MaterialService.toast(res.message);
        },
        (error) => {
          MaterialService.toast(error.error.message);
        }
      );
    }
  }
}
