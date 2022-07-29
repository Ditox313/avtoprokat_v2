import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './cars-page/add-car/add-car.component';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { ShowCarComponent } from './cars-page/show-car/show-car.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientsComponent } from './clients/clients.component';
import { ShowClientComponent } from './clients/show-client/show-client.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

// Массив наших роутов. Роуты делим на layouts
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '', // Устанавливаем дефолтный роут, когда попадаем на страницу layout.
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
  },
  
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
    children: [
      {
        path: 'cars-page',
        component: CarsPageComponent,
      },
      {
        path: 'overview-page',
        component: OverviewPageComponent,
      }
      ,
      { path: 'add-car', component: AddCarComponent },
      { path: 'show-car/edit/:id', component: ShowCarComponent},
      { path: 'clients-page',component: ClientsComponent,},
      { path: 'add-client', component: AddClientComponent},
      { path: 'show-client/edit/:id', component: ShowClientComponent},
      
    ],
  },
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)  // Импортируем модуль для регистрации наших роутов
  ],
  
  exports: [
    RouterModule    // Возвращаем модуль уже сконфигурированный с зарегистрированными роутами
  ]
})
export class AppRoutingModule { }
