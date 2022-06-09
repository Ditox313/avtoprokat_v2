import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { Car } from '../shared/interfaces';
import { CarsService } from '../shared/services/cars.service';



// Шаг пагинации
  const STEP = 2



@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.css']
})

export class CarsPageComponent implements OnInit, OnDestroy {
  //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription; 
  xscars: Car[] = []
  offset: any = 0
  limit: any = STEP
  loading = false;
  noMoreCars: Boolean = false
  constructor(private cars: CarsService, private rote: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetch()    
  }

  ngOnDestroy(): void {
  }
  



  // Получаем все кейсы
  public fetch()
  {
    // Отправляем параметры для пагинации
    const params = {
      offset: this.offset,
      limit: this.limit
    }

    this.loading = true
    this.Sub = this.cars.fetch(params).subscribe((cars) =>{

    if(cars.length < STEP)
    {
      this.noMoreCars = true
    }
      
    this.loading = false
    this.xscars = this.xscars.concat(cars)
    });    
  }



  loadmore()
  {
    this.loading = true
    this.offset += STEP
    this.fetch()
    this.loading = false
  }




  // Удалить позицию
  onDeleteCar(event: Event, xscar: Car): void
  {
    event.stopPropagation();


    const dicision = window.confirm(`Удалить кейс?`);

    if (dicision) {
      this.cars.delete(xscar._id).subscribe(res => {
        const idxPos = this.xscars.findIndex(p => p._id === xscar._id);
        this.xscars.splice(idxPos, 1);
        MaterialService.toast(res.message)
        
      }, error => {
        MaterialService.toast(error.error.message);
      })
    }
  }
    // Отправляем параметры для пагинации
    // const params = {
    //   offset: this.offset,
    //   limit: this.limit
    // }

    // this.xsSub = this.caseServise.fetch(params).subscribe((cases)=>{
    //   if(cases.length < STEP)
    //   {
    //     this.noMoreCases = true
    //   }
       
    //   this.loading = false
    //   this.cases = this.cases.concat(cases)
    // });
    
}
