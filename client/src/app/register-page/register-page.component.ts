import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  
  form!: FormGroup; //Инициализируем нашу форму
  uSub!: Subscription; //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него



  // Инжектируем необходимые сервисы в класс для их послдующего использования
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }


  // Инициализируем форму. Говорим какие инпуты будут
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }


  // Отписываемся от стрима, что бы не было утечки памяти
  ngOnDestroy(){
    if(this.uSub)
    {
      this.uSub.unsubscribe();
    }
  }



  // Обрабатываем отправку формы
  onSubmit(): void {
    this.form.disable();
    

    // Создаем юзера(кандидата)
    const user = {
      email: this.form.value.email,
      password:  this.form.value.password
    }

    // Выполняме метод auth.register из сервиса auth.service и в случае успеха делаем редирект на логин и обрабатываем ошибку
    this.uSub = this.auth.register(user).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message);
        console.warn(error);
        this.form.enable();
      }
      
    )
  }

}


