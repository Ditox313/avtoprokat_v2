import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Car, MaterialDatepicker } from 'src/app/shared/interfaces';
import { CarsService } from '../../shared/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.css']
})
export class ShowCarComponent implements OnInit,OnDestroy {


  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('start_arenda') start_arenda_avto!: ElementRef;
  @ViewChild('end_arenda') end_arenda_avto!: ElementRef;


  carId!: string; //Для хранения id авто
  xsActualCar!: Car;//Текущий авто, который будем редактировать


  //Создаем переменную, в которую помещаем наш стрим, что бы потом отписаться от него
  Sub!: Subscription; 

  // Валидность
  isValid: any = true;

  //Инициализируем нашу форму
  form!: FormGroup; 


   // Храним дату начала
  start: MaterialDatepicker | any;

  // Храним дату конца
  end: MaterialDatepicker | any;


  // Храним  даты из ответа для форматирования
  start_date_responce!: any
  end_date_responce!: any

  // Задаем переменную для хранения картинки после пото как загрузили с устройтста
  image!: File


  // Превью изображения авто
  imagePreview : any = '';

  test!: any;


  // Забираем дом элемент input загрузки файла и ложим его в переменную inputgRef
  @ViewChild('input') inputRef!: ElementRef;

  constructor(private cars: CarsService, private router: Router, private rote: ActivatedRoute, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      marka: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      probeg: new FormControl(null,),
      price: new FormControl(null, ),
      start_arenda: new FormControl(null),
      end_arenda: new FormControl(null),
      vladelec: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      sts_seria: new FormControl(null),
      sts_number: new FormControl(null),
      sts_date: new FormControl(null),
      osago_seria: new FormControl(null),
      osago_number: new FormControl(null),
      osago_date_finish: new FormControl(null),
      vin: new FormControl(null),
      color: new FormControl(null),
      year_production: new FormControl(null),
      price_ocenka: new FormControl(null),
      to_date: new FormControl(null),
      to_probeg_prev: new FormControl(null),
      to_probeg_next: new FormControl(null),
      to_interval: new FormControl(null),
      oil_name: new FormControl(null),
      stoa_name: new FormControl(null),
      stoa_phone: new FormControl(null),
    });



    // Достаем параметры
    this.rote.params.subscribe((params)=>{
      this.carId = params['id'];
    });


    this.cars.getById(this.carId).subscribe((res)=> {
      this.xsActualCar = res
      if(res.previewSrc)
      {
        this.imagePreview = res.previewSrc
      }


      this.form.patchValue({ 
        marka: res.marka, 
        model: res.model, 
        number: res.number, 
        probeg: res.probeg, 
        price: res.price, 
        start_arenda: res.start_arenda, 
        end_arenda: res.end_arenda, 
        vladelec: res.vladelec, 
        category: res.category, 
        status: res.status, 
        sts_seria: res.sts_seria,
        sts_number: res.sts_number,
        sts_date: res.sts_date,
        osago_seria: res.osago_seria,
        osago_number: res.osago_number,
        osago_date_finish: res.osago_date_finish,
        vin: res.vin,
        color: res.color,
        year_production: res.year_production,
        price_ocenka: res.price_ocenka,
        to_date: res.to_date,
        to_probeg_prev: res.to_probeg_prev,
        to_probeg_next: res.to_probeg_next,
        to_interval: res.to_interval,
        oil_name: res.oil_name,
        stoa_name: res.stoa_name,
        stoa_phone: res.stoa_phone,
      })


      // Форматируем даты
      this.start_date_responce = this.datePipe.transform(res.start_arenda,'dd.MM.yyyy'); 
      this.end_date_responce = this.datePipe.transform(res.end_arenda,'dd.MM.yyyy'); 
      
    
    });
  }


  ngOnDestroy(): void {
    this.start.destroy()
  }

  

  ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement)
    this.start = MaterialService.initDatepicker(this.start_arenda_avto, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.end_arenda_avto, this.validate.bind(this));
    MaterialService.updateTextInputs();
  }



    // Валидация
  validate() {
    if(!this.start.date || !this.end.date)
    {  
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }



  // Обрабатываем загрузку картинок
  onFileUpload(event: any)
  {
    const file = event.target.files['0'];
    this.image = file;

    

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();


    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {

      // Переменная для хранения информации об изображении
      this.imagePreview = reader.result;
    };


    // Читаем нужный нам файл
      reader.readAsDataURL(file);
  }



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClick()
  {
    this.inputRef.nativeElement.click();
  }



  // Отправка формы
  onSubmit(){
    // this.form.disable();


    // Обновляем авто
    const car = {
      marka: this.form.value.marka,
      model:  this.form.value.model,
      number:  this.form.value.number,
      probeg:  this.form.value.probeg,
      price:  this.form.value.price,
      start_arenda:  this.start.date || this.form.value.start_arenda,
      end_arenda:  this.end.date || this.form.value.end_arenda,
      vladelec:  this.form.value.vladelec,
      category:  this.form.value.category,
      status:  this.form.value.status,
      sts_seria:  this.form.value.sts_seria,
      sts_number:  this.form.value.sts_number,
      sts_date:  this.form.value.sts_date,
      osago_seria:  this.form.value.osago_seria,
      osago_number:  this.form.value.osago_number,
      osago_date_finish:  this.form.value.osago_date_finish,
      vin:  this.form.value.vin,
      color:  this.form.value.color,
      year_production:  this.form.value.year_production,
      price_ocenka:  this.form.value.price_ocenka,
      to_date:  this.form.value.to_date,
      to_probeg_prev:  this.form.value.to_probeg_prev,
      to_probeg_next:  this.form.value.to_probeg_next,
      to_interval:  this.form.value.to_interval,
      oil_name:  this.form.value.oil_name,
      stoa_name:  this.form.value.stoa_name,
      stoa_phone:  this.form.value.stoa_phone,
    }
    
   this.cars.update(this.carId, car, this.image).subscribe((car) =>{
        MaterialService.toast('Автомобиль Изменен')
    });    

    
  }

}
