import { Message } from './../interfaces';
import { Partner } from 'src/app/shared/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class PartnersService {
  constructor(private http: HttpClient) {}


  // Создаем нового партнера
  create(partner: Partner, image?: File): Observable<Partner> {
    const fd = new FormData(); 
      fd.append('name', partner.name);
      fd.append('surname', partner.surname);
      fd.append('lastname', partner.lastname);
      fd.append('passport_seria', partner.passport_seria);
      fd.append('passport_number', partner.passport_number);
      fd.append('passport_date', partner.passport_date);
      fd.append('passport_who_take', partner.passport_who_take);
      fd.append('code_podrazdeleniya', partner.code_podrazdeleniya);
      fd.append('passport_register', partner.passport_register);
      fd.append('passport_address_fact', partner.passport_address_fact);
      fd.append('prava_seria', partner.prava_seria);
      fd.append('prava_number', partner.prava_number);
      fd.append('prava_date', partner.prava_date);
      fd.append('phone_main', partner.phone_main);
      fd.append('phone_1_dop_name', partner.phone_1_dop_name);
      fd.append('phone_1_dop_number', partner.phone_1_dop_number);
      fd.append('phone_2_dop_name', partner.phone_2_dop_name);
      fd.append('phone_2_dop_number', partner.phone_2_dop_number);
      fd.append('phone_3_dop_name', partner.phone_3_dop_name);
      fd.append('phone_3_dop_number', partner.phone_3_dop_number);
      fd.append('phone_4_dop_name', partner.phone_4_dop_name);
      fd.append('phone_4_dop_number', partner.phone_4_dop_number);


    return this.http.post<Partner>(`/api/partners`, fd);
  }


}