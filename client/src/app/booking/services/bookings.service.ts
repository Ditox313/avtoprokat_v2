
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Booking } from 'src/app/shared/types/interfaces';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class BookingsService {
  constructor(private http: HttpClient) {}

  // Создаем новую бронь
  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`/api/bookings`, booking);
  }

  // Получаем список всех позиций
  fetch(params: any = {}): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/bookings', {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  // Получаем позицию по id
  getById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`/api/bookings/${id}`);
  }



  update(id: string, xsbooking: Booking): Observable<Booking> {
    xsbooking._id = id;

    return this.http.patch<Booking>(`/api/bookings/${id}`, xsbooking);
  }

  //   get_all(): Observable<Client[]>
  //   {
  //       return this.http.get<Client[]>('/api/clients/all');
  //   }

  // Удаление
  // delete(id: any): Observable<any>
  // {
  //    return this.http.delete<any>(`/api/clients/${id}`);
  // }

}