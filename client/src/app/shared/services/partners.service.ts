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
  create(partner: Partner, passport__1?: File,passport__2?: File,prava__1?: File, prava__2?: File): Observable<Partner> {
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

      if(passport__1)
      {
         fd.append('passport_1_img', passport__1, passport__1.name);
      }


      if(passport__2)
      {
         fd.append('passport_2_img', passport__2, passport__2.name);
      }

      if(prava__1)
      {
         fd.append('prava_1_img', prava__1, prava__1.name);
      }

      if(prava__2)
      {
         fd.append('prava_2_img', prava__2, prava__2.name);
      }
      

    return this.http.post<Partner>(`/api/partners`, fd);
  }

  // // Получаем список всех позиций
  fetch(params: any = {}): Observable<Partner[]> {
    return this.http.get<Partner[]>('/api/partners', {
       params: new HttpParams({
          fromObject: params
       })
    });
  }


  // Удаление
   delete(id: any): Observable<any>
   {
      return this.http.delete<any>(`/api/partners/${id}`);
   }


   // Обновление
   update(id:string, xspartner: Partner,  passport__1?: File,passport__2?: File,prava__1?: File, prava__2?: File): Observable<Partner> {
      const fd = new FormData(); 
      fd.append('name', xspartner.name);
      fd.append('surname', xspartner.surname);
      fd.append('lastname', xspartner.lastname);
      fd.append('passport_seria', xspartner.passport_seria);
      fd.append('passport_number', xspartner.passport_number);
      fd.append('passport_date', xspartner.passport_date);
      fd.append('passport_who_take', xspartner.passport_who_take);
      fd.append('code_podrazdeleniya', xspartner.code_podrazdeleniya);
      fd.append('passport_register', xspartner.passport_register);
      fd.append('passport_address_fact', xspartner.passport_address_fact);
      fd.append('prava_seria', xspartner.prava_seria);
      fd.append('prava_number', xspartner.prava_number);
      fd.append('prava_date', xspartner.prava_date);
      fd.append('phone_main', xspartner.phone_main);
      fd.append('phone_1_dop_name', xspartner.phone_1_dop_name);
      fd.append('phone_1_dop_number', xspartner.phone_1_dop_number);
      fd.append('phone_2_dop_name', xspartner.phone_2_dop_name);
      fd.append('phone_2_dop_number', xspartner.phone_2_dop_number);
      fd.append('phone_3_dop_name', xspartner.phone_3_dop_name);
      fd.append('phone_3_dop_number', xspartner.phone_3_dop_number);
      fd.append('phone_4_dop_name', xspartner.phone_4_dop_name);
      fd.append('phone_4_dop_number', xspartner.phone_4_dop_number);
      fd.append('partnerId', id);

      if(passport__1)
      {
         fd.append('passport_1_img', passport__1, passport__1.name);
      }


      if(passport__2)
      {
         fd.append('passport_2_img', passport__2, passport__2.name);
      }

      if(prava__1)
      {
         fd.append('prava_1_img', prava__1, prava__1.name);
      }

      if(prava__2)
      {
         fd.append('prava_2_img', prava__2, prava__2.name);
      }

      return this.http.patch<Partner>(`/api/partners/update/${id}`, fd);
   }


   // Получаем позицию по id
   getById(id: string): Observable<Partner>
   {
      return this.http.get<Partner>(`/api/partners/${id}`);
   }


}