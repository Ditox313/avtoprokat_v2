import { Message } from '../interfaces';
import { Client } from 'src/app/shared/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class ClientsService {
  constructor(private http: HttpClient) {}


  // Создаем нового партнера
  create(client: Client, passport__1?: File,passport__2?: File,prava__1?: File, prava__2?: File): Observable<Client> {
    const fd = new FormData(); 
      fd.append('name', client.name);
      fd.append('surname', client.surname);
      fd.append('lastname', client.lastname);
      fd.append('passport_seria', client.passport_seria);
      fd.append('passport_number', client.passport_number);
      fd.append('passport_date', client.passport_date);
      fd.append('passport_who_take', client.passport_who_take);
      fd.append('code_podrazdeleniya', client.code_podrazdeleniya);
      fd.append('passport_register', client.passport_register);
      fd.append('passport_address_fact', client.passport_address_fact);
      fd.append('prava_seria', client.prava_seria);
      fd.append('prava_number', client.prava_number);
      fd.append('prava_date', client.prava_date);
      fd.append('phone_main', client.phone_main);
      fd.append('phone_1_dop_name', client.phone_1_dop_name);
      fd.append('phone_1_dop_number', client.phone_1_dop_number);
      fd.append('phone_2_dop_name', client.phone_2_dop_name);
      fd.append('phone_2_dop_number', client.phone_2_dop_number);
      fd.append('phone_3_dop_name', client.phone_3_dop_name);
      fd.append('phone_3_dop_number', client.phone_3_dop_number);
      fd.append('phone_4_dop_name', client.phone_4_dop_name);
      fd.append('phone_4_dop_number', client.phone_4_dop_number);

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
      

    return this.http.post<Client>(`/api/clients`, fd);
  }

  // Получаем список всех позиций
  fetch(params: any = {}): Observable<Client[]> {
    return this.http.get<Client[]>('/api/clients', {
       params: new HttpParams({
          fromObject: params
       })
    });
  }

  get_all(): Observable<Client[]>
  {
      return this.http.get<Client[]>('/api/clients/all');
  }


  // Удаление
   delete(id: any): Observable<any>
   {
      return this.http.delete<any>(`/api/clients/${id}`);
   }


   // Обновление
   update(id:string, xsclient: Client,  passport__1?: File,passport__2?: File,prava__1?: File, prava__2?: File): Observable<Client> {
      const fd = new FormData(); 
      fd.append('name', xsclient.name);
      fd.append('surname', xsclient.surname);
      fd.append('lastname', xsclient.lastname);
      fd.append('passport_seria', xsclient.passport_seria);
      fd.append('passport_number', xsclient.passport_number);
      fd.append('passport_date', xsclient.passport_date);
      fd.append('passport_who_take', xsclient.passport_who_take);
      fd.append('code_podrazdeleniya', xsclient.code_podrazdeleniya);
      fd.append('passport_register', xsclient.passport_register);
      fd.append('passport_address_fact', xsclient.passport_address_fact);
      fd.append('prava_seria', xsclient.prava_seria);
      fd.append('prava_number', xsclient.prava_number);
      fd.append('prava_date', xsclient.prava_date);
      fd.append('phone_main', xsclient.phone_main);
      fd.append('phone_1_dop_name', xsclient.phone_1_dop_name);
      fd.append('phone_1_dop_number', xsclient.phone_1_dop_number);
      fd.append('phone_2_dop_name', xsclient.phone_2_dop_name);
      fd.append('phone_2_dop_number', xsclient.phone_2_dop_number);
      fd.append('phone_3_dop_name', xsclient.phone_3_dop_name);
      fd.append('phone_3_dop_number', xsclient.phone_3_dop_number);
      fd.append('phone_4_dop_name', xsclient.phone_4_dop_name);
      fd.append('phone_4_dop_number', xsclient.phone_4_dop_number);
      fd.append('clientId', id);

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

      return this.http.patch<Client>(`/api/clients/update/${id}`, fd);
   }


   // Получаем позицию по id
   getById(id: string): Observable<Client>
   {
      return this.http.get<Client>(`/api/clients/${id}`);
   }


}