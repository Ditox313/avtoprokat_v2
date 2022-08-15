
// Сервис позиций
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Car } from 'src/app/shared/types/interfaces';


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

      fd.append('sts_seria', car.sts_seria);
      fd.append('sts_number', car.sts_number);
      fd.append('sts_date', car.sts_date);
      fd.append('osago_seria', car.osago_seria);
      fd.append('osago_number', car.osago_number);
      fd.append('osago_date_finish', car.osago_date_finish);
      fd.append('vin', car.vin);
      fd.append('color', car.color);
      fd.append('year_production', car.year_production);
      fd.append('price_ocenka', car.price_ocenka);
      fd.append('to_date', car.to_date);
      fd.append('to_probeg_prev', car.to_probeg_prev);
      fd.append('to_probeg_next', car.to_probeg_next);
      fd.append('to_interval', car.to_interval);
      fd.append('oil_name', car.oil_name);
      fd.append('stoa_name', car.stoa_name);
      fd.append('stoa_phone', car.stoa_phone);

      fd.append('days_1_2', car.days_1_2);
      fd.append('days_3_7', car.days_3_7);
      fd.append('days_8_14', car.days_8_14);
      fd.append('days_15_30', car.days_15_30);
      fd.append('days_31_more', car.days_31_more);
      fd.append('mezgorod', car.mezgorod);
      fd.append('russia', car.russia);
      fd.append('price_dop_hour', car.price_dop_hour);
      fd.append('zalog', car.zalog);

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

      fd.append('sts_seria', xscar.sts_seria);
      fd.append('sts_number', xscar.sts_number);
      fd.append('sts_date', xscar.sts_date);
      fd.append('osago_seria', xscar.osago_seria);
      fd.append('osago_number', xscar.osago_number);
      fd.append('osago_date_finish', xscar.osago_date_finish);
      fd.append('vin', xscar.vin);
      fd.append('color', xscar.color);
      fd.append('year_production', xscar.year_production);
      fd.append('price_ocenka', xscar.price_ocenka);
      fd.append('to_date', xscar.to_date);
      fd.append('to_probeg_prev', xscar.to_probeg_prev);
      fd.append('to_probeg_next', xscar.to_probeg_next);
      fd.append('to_interval', xscar.to_interval);
      fd.append('oil_name', xscar.oil_name);
      fd.append('stoa_name', xscar.stoa_name);
      fd.append('stoa_phone', xscar.stoa_phone);

      fd.append('days_1_2', xscar.days_1_2);
      fd.append('days_3_7', xscar.days_3_7);
      fd.append('days_8_14', xscar.days_8_14);
      fd.append('days_15_30', xscar.days_15_30);
      fd.append('days_31_more', xscar.days_31_more);
      fd.append('mezgorod', xscar.mezgorod);
      fd.append('russia', xscar.russia);
      fd.append('price_dop_hour', xscar.price_dop_hour);
      fd.append('zalog', xscar.zalog);

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