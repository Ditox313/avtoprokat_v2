import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { Car } from '../shared/interfaces';
import { CarsService } from '../shared/services/cars.service';

@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.css']
})
export class CarsPageComponent implements OnInit, OnDestroy {

  //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription; 
  xscars: Car[] = []

  loading = false;

  constructor(private cars: CarsService, private rote: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetch()    
  }

  ngOnDestroy(): void {
  }
  



  // Получаем все кейсы
  public fetch()
  {
    this.loading = true
      this.Sub = this.cars.fetch().subscribe((cars) =>{
        this.xscars = cars
        this.loading = false
        console.log(cars);
        
    });    
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
