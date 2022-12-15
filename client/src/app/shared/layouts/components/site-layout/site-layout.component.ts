import { Router } from '@angular/router';
import { AfterViewInit, ViewChild, Component, ElementRef, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/types/interfaces';


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})

// AfterViewInit интерфейс реализующий AfterViewInit метод, который покажет когда DOM компонента будет полностью загружен
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  currentUser!: any;

  @ViewChild('floating') floatingRef!: ElementRef;


  

  // Инжектируем сервис авторизации и роутер
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.get_user().subscribe(user => {
      this.currentUser = user;
      
      this.links.push({
        url: `/account/${this.currentUser._id}`,
        name: 'Настройки',
      })
    })
  }

  // Метод будет вызван когда загрузится все DOM дерево
  ngAfterViewInit(): void {
    // MaterialService.initializeFloatingButton(this.floatingRef);
  }

  // Массив с ссылками навигации сайдбара
  links: any = [
    {
      url: '/overview-page',
      name: 'Обзор',
    },
    {
      url: '/cars-page',
      name: 'Автомобили',
    },
    {
      url: '/bookings-page',
      name: 'Брони',
    },
    {
      url: '/clients-page',
      name: 'Клиенты',
    },
    {
      url: '/partners-page',
      name: 'Партнеры',
    },

  ];

  // Описываем метод выхода из системы
  logout(event: Event): void {
    // Отменяем перезагрузку страницы
    event.preventDefault();

    // Запускаем метод logout в сервисе авторизации
    this.auth.logout();

    // Делаем редирект на страницу логина
    this.router.navigate(['/login']);
  }
}
