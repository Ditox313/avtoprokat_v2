import { Message } from './../interfaces';
// Сервис позиций
import { Car } from 'src/app/shared/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class CarsService {
  constructor(private http: HttpClient) {}


  // Создаем новую позицию
  create(car: Car, image?: File): Observable<Car> {
    const fd = new FormData(); 
      fd.append('marka', car.marka);
      fd.append('model', car.model);
      fd.append('probeg', car.probeg);
      fd.append('price', car.price);
      fd.append('start_arenda', car.start_arenda);
      fd.append('end_arenda', car.end_arenda);
      fd.append('vladelec', car.vladelec);
      fd.append('status', car.status);
      fd.append('category', car.category);
      fd.append('number', car.number);

      if(image)
      {
         fd.append('previewSrc', image, image.name);
      }

    
    return this.http.post<Car>(`/api/cars`, fd);
  }

  // // Получаем список всех позиций
  fetch(params: any = {}): Observable<Car[]> {
    return this.http.get<Car[]>('/api/cars', {
       params: new HttpParams({
          fromObject: params
       })
    });
  }

  
  update(id:string, xscar: Car, image?: File): Observable<Car> {

      const fd = new FormData(); 
      fd.append('marka', xscar.marka);
      fd.append('model', xscar.model);
      fd.append('probeg', xscar.probeg);
      fd.append('price', xscar.price);
      fd.append('start_arenda', xscar.start_arenda);
      fd.append('end_arenda', xscar.end_arenda);
      fd.append('vladelec', xscar.vladelec);
      fd.append('status', xscar.status);
      fd.append('category', xscar.category);
      fd.append('number', xscar.number);
      fd.append('carId', id);

      if(image)
      {
         fd.append('previewSrc', image, image.name);
      }

      return this.http.patch<Car>(`/api/cars/update/${id}`, fd);
   }


  // Получаем позицию по id
  getById(id: string): Observable<Car>
   {
      return this.http.get<Car>(`/api/cars/${id}`);
   }


   // Удаление авто
   delete(id: any): Observable<any>
   {
      return this.http.delete<any>(`/api/cars/${id}`);
   }
}