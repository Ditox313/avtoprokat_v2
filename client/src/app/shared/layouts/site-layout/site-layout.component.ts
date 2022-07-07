import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AfterViewInit, ViewChild, Component, ElementRef} from '@angular/core';
import { MaterialService } from '../../classes/material.service';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})

// AfterViewInit интерфейс реализующий AfterViewInit метод, который покажет когда DOM компонента будет полностью загружен
export class SiteLayoutComponent implements AfterViewInit {



  // Забираем дом элемент и ложим его в переменную floatingRef
  @ViewChild('floating') floatingRef!: ElementRef;
  // Метод будет вызван когда загрузится все DOM дерево
  ngAfterViewInit(): void
  {
    // MaterialService.initializeFloatingButton(this.floatingRef);
  }



  // Массив с ссылками навигации сайдбара
  links: Array<any> = [
    {
      url: '/overview-page',
      name: 'Обзор'
    },
    {
      url: '/cars-page',
      name: 'Автомобили'
    },
    {
      url: '/partners-page',
      name: 'Партнеры'
    },
  ];
  



  // Инжектируем сервис авторизации и роутер
  constructor(private auth: AuthService, private router: Router) { }

  



  // Описываем метод выхода из системы
   logout(event: Event): void
  {

    // Отменяем перезагрузку страницы
    event.preventDefault();


    // Запускаем метод logout в сервисе авторизации
    this.auth.logout();

    // Делаем редирект на страницу логина
    this.router.navigate(["/login"]);
  }

}
