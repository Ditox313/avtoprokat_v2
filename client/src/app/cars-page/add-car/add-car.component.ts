import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit,AfterViewInit  {

  // Забираем дом элемент input загрузки файла и ложим его в переменную inputgRef
  @ViewChild('tabs') tabs!: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.tabs);
    MaterialService.initTabs(this.tabs.nativeElement)
  }

  

}
