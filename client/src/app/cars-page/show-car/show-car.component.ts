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
      probeg: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      start_arenda: new FormControl(null),
      end_arenda: new FormControl(null),
      vladelec: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
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
    }
    
   this.cars.update(this.carId, car, this.image).subscribe((car) =>{
        MaterialService.toast('Автомобиль Изменен')
    });    

    
  }

}
