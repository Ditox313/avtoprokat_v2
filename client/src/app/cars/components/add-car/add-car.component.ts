import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CarsService } from '../../services/cars.service';
import { PartnersService } from 'src/app/partners/services/partners.service';
import { MaterialDatepicker } from 'src/app/shared/types/interfaces';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit,AfterViewInit,OnDestroy  {

  @ViewChild('tabs') tabs!: ElementRef;
  @ViewChild('start_arenda') start_arenda_avto!: ElementRef;
  @ViewChild('end_arenda') end_arenda_avto!: ElementRef;

  @ViewChild('sts_date_info') sts_date_info_avto!: ElementRef;
  @ViewChild('osago_date_finish_info') osago_date_finish_info_avto!: ElementRef;
  @ViewChild('to_date_info') to_date_info_avto!: ElementRef;

  // Забираем дом элемент input загрузки файла и ложим его в переменную inputgRef
  @ViewChild('input') inputRef!: ElementRef;

  //Создаем переменную, в которую помещаем наш стим, что бы потом отписаться от него
  Sub!: Subscription; 

  // Валидность
  isValid: any = true;

  //Инициализируем нашу форму
  form!: FormGroup; 


   // Храним дату начала
  start: MaterialDatepicker | any;

  // Храним дату конца
  end: MaterialDatepicker | any;

  // Храним дату выдачи СТС
  sts_date_x: MaterialDatepicker | any;

  // Храним дату окончания полиса осаго
  osago_date_finish_x: MaterialDatepicker | any;

  // Храним дату последнего ТО
  to_date_x: MaterialDatepicker | any;

  // Задаем переменную для хранения картинки после пото как загрузили с устройтста
  image!: File


  // Превью изображения авто
  imagePreview : any = '';


  // Список владельцев
  xspartners!: any


  

  constructor(private cars: CarsService, private router: Router,private partners: PartnersService,  public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      marka: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      probeg: new FormControl('',),
      price: new FormControl('', ),
      start_arenda: new FormControl(''),
      end_arenda: new FormControl(''),
      vladelec: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      sts_seria: new FormControl(''),
      sts_number: new FormControl(''),
      sts_date: new FormControl(''),
      osago_seria: new FormControl(''),
      osago_number: new FormControl(''),
      osago_date_finish: new FormControl(''),
      vin: new FormControl(''),
      color: new FormControl(''),
      year_production: new FormControl(''),
      price_ocenka: new FormControl(''),
      to_date: new FormControl(''),
      to_probeg_prev: new FormControl(''),
      to_probeg_next: new FormControl(''),
      to_interval: new FormControl(''),
      oil_name: new FormControl(''),
      stoa_name: new FormControl(''),
      stoa_phone: new FormControl(''),
    });


    // Получаем список партнеров
    this.partners.get_all().subscribe(res => {this.xspartners = res;})
  }



  ngOnDestroy(): void {
    this.start.destroy()
  }

  

  ngAfterViewInit(): void {
    MaterialService.initTabs(this.tabs.nativeElement)
    this.start = MaterialService.initDatepicker(this.start_arenda_avto, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.end_arenda_avto, this.validate.bind(this));

    this.sts_date_x = MaterialService.initDatepicker(this.sts_date_info_avto, this.validate.bind(this));
    this.osago_date_finish_x = MaterialService.initDatepicker(this.osago_date_finish_info_avto, this.validate.bind(this));
    this.to_date_x = MaterialService.initDatepicker(this.to_date_info_avto, this.validate.bind(this));
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

    // Создаем авто
    const car = {
      marka: this.form.value.marka,
      model: this.form.value.model,
      number: this.form.value.number,
      probeg: this.form.value.probeg,
      price: this.form.value.price,
      start_arenda: new Date(this.start.date).toLocaleDateString('ru-RU'),
      end_arenda: new Date(this.end.date).toLocaleDateString('ru-RU'),
      vladelec: this.form.value.vladelec,
      category: this.form.value.category,
      status: this.form.value.status,
      sts_seria: this.form.value.sts_seria,
      sts_number: this.form.value.sts_number,
      sts_date: new Date(this.sts_date_x.date).toLocaleDateString('ru-RU'),
      osago_seria: this.form.value.osago_seria,
      osago_number: this.form.value.osago_number,
      osago_date_finish:  new Date(this.osago_date_finish_x.date).toLocaleDateString('ru-RU'),
      vin: this.form.value.vin,
      color: this.form.value.color,
      year_production: this.form.value.year_production,
      price_ocenka: this.form.value.price_ocenka,
      to_date:  new Date(this.to_date_x.date).toLocaleDateString('ru-RU'),
      to_probeg_prev: this.form.value.to_probeg_prev,
      to_probeg_next: this.form.value.to_probeg_next,
      to_interval: this.form.value.to_interval,
      oil_name: this.form.value.oil_name,
      stoa_name: this.form.value.stoa_name,
      stoa_phone: this.form.value.stoa_phone,
    };

    this.Sub = this.cars.create(car, this.image).subscribe((car) => {
      MaterialService.toast('Автомобиль добавлен');
      this.router.navigate(['/cars-page']);
    });
  }

  

}
