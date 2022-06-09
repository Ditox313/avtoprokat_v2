import { Message } from './../interfaces';
// Сервис позиций
import { Car } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
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
  fetch(): Observable<Car[]> {
    return this.http.get<Car[]>('/api/cars');
  }

  
  // // Редактируем позицию
  // update(position: Position): Observable<Position> {
  //   return this.http.patch<Position>(`/api/position/${position._id}`, position);
  // }

  // // Удалить позицию
  // delete(position: Position): Observable<Message> {
  //   return this.http.delete<Message>(`/api/position/${position._id}`);
  // }
}